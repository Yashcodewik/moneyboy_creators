

  import ShowToast from "@/components/common/ShowToast";
  import defaultAxios from "../api/axios";
  
  interface PageResponse {
    results: any[];
    hasMore: boolean;
  }
  interface deleteParams {
    url: string;
  }
  interface ApiParams {
    url: string;
    page?: number;
    searchText?: string;
    rowsPerPage?: number;
  }
  
  interface ApiParamsQuery {
    url: string;
    params?: string;
  }
  
  interface postParams {
    url: string;
    values: any;
  }
  
  export const getApiWithOutQuery = async ({ url }: ApiParams): Promise<any> => {
    try {
      const res = await defaultAxios.get(url, {
        headers: {
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (err: any) {
      return err?.response?.data;
    }
  };
  
  export const getApi = async ({
    url,
    page,
    searchText,
    rowsPerPage,
  }: ApiParams): Promise<any> => {
    try {
      let q = searchText ? searchText : "";
      const res = await defaultAxios.get(
        url + "?page=" + page + "&rowsPerPage=" + rowsPerPage + "&q=" + q,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return err?.response?.data;
    }
  };
  
  export const getApiByParams = async ({
    url,
    params,
  }: ApiParamsQuery): Promise<any> => {
    try {
      const res = await defaultAxios.get(url + "/" + params, {
        headers: {
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (err: any) {
      return err?.response?.data;
    }
  };
  
  export const apiPost = async ({ url, values }: postParams): Promise<any> => {
    try {
      const res = await defaultAxios.post(url, values, {
        headers: {
          Accept: "application/json",
        },
      });
      // ShowToast(res.data?.message, "success");
      return res.data;
    } catch (err: any) {
      // ShowToast(err?.response?.data?.error, "error");
      return err?.response?.data;
    }
  };
  
  export const apiPostWithMultiForm = async ({
    url,
    values,
  }: postParams): Promise<any> => {
    try {
      const res = await defaultAxios.post(url, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      // ShowToast(res.data?.message, "success");
      return res.data;
    } catch (err: any) {
      ShowToast(err?.response?.data?.error, "error");
      return err?.response?.data;
    }
  };
  
  export const apiPatch = async ({ url, values }: postParams): Promise<any> => {
    try {
      const res = await defaultAxios.patch(url, values, {
        headers: {
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (err: any) {
      ShowToast(err?.response?.data?.error || "Something went wrong", "error");
      return err?.response?.data;
    }
  };
  export const apiPatchWithMultiForm = async ({
    url,
    values,
  }: postParams): Promise<any> => {
    try {
      const res = await defaultAxios.patch(url, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err: any) {
      ShowToast(err?.response?.data?.error || "Something went wrong", "error");
      return err?.response?.data;
    }
  };


  export const apiDelete = async ({ url }: deleteParams): Promise<any> => {
    try {
      const res = await defaultAxios.delete(url, {
        headers: {
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (err: any) {
      ShowToast(err?.response?.data?.error || "Something went wrong", "error");
      return err?.response?.data;
    }
  };