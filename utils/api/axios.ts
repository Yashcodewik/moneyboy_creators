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
    return config;
  }
);

defaultAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response && response.data?.code == 401) {
      ShowToast(response.data?.error, "error");
      await signOut({ redirect: false });
      // window.location.href = "/";
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
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default defaultAxios;
