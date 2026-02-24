import axios from "axios";
import { APIBaseUrl } from "../constance";

// Server-side axios instance — no session interceptor needed
const serverAxios = axios.create({ baseURL: APIBaseUrl });

export const serverApiPost = async ({ url, values, token }: { 
  url: string; 
  values: object; 
  token?: string 
}) => {
  try {
    const res = await serverAxios.post(url, values, {
      headers: {
        Accept: "application/json",
        ...(token && { authorization: `Bearer ${token}` }),
      },
    });
    return res.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};