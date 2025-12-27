import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import { APIBaseUrl } from "../constance";
import { getDecryptedSession } from "@/libs/getDecryptedSession";
import ShowToast from "@/components/common/ShowToast";
import { signOut } from "next-auth/react";

const defaultAxios = axios.create({ baseURL: APIBaseUrl });

defaultAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session: any = await getDecryptedSession();
    if (session?.token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers["authorization"] = `Bearer ${session?.token}`;
    }

    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      let subdomain: string | null = null;
      if (hostname.endsWith("localhost")) {
        subdomain = parts.length > 1 ? parts[0] : null;
      } else if (hostname.endsWith("arcalisnews.com")) {
        subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : null;
      }
      if (subdomain) {
        config.headers["x-tenant"] = subdomain;
      }
      config.headers["x-forwarded-host"] = window.location.host;
      config.headers["origin"] = window.location.origin;
    }

    return config;
  }
);

defaultAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response && response.data?.code == 401) {
      ShowToast(response.data?.error, "error");
      await signOut({ redirect: false });
      window.location.href = "/";
    }
    return response;
  },
  async (error) => {
    if (
      (error.response && error.response?.status === 401) ||
      error.code === "ERR_NETWORK"
    ) {
      ShowToast(error.response?.data?.message || "Network error", "error");
      await signOut({ redirect: false });
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default defaultAxios;
