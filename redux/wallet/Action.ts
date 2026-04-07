import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost, getApi, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_GET_WALLET,
  API_ADD_WALLET,
  API_GET_TRANSACTIONS,
} from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getApiWithOutQuery({
        url: API_GET_WALLET,
      });

      if (!res?.success) {
        ShowToast(res?.message || "Failed to fetch wallet", "error");
        return rejectWithValue(res?.message);
      }

      return res; // { success, balance }
    } catch (error: any) {
      ShowToast("Something went wrong", "error");
      return rejectWithValue(error?.message);
    }
  },
);

export const addWalletFunds = createAsyncThunk(
  "wallet/addWalletFunds",
  async (
    {
      amount,
      paymentMethod,
    }: {
      amount: number;
      paymentMethod: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiPost({
        url: API_ADD_WALLET,
        values: {
          amount,
          paymentMethod,
        },
      });

      if (!res?.success) {
        ShowToast(res?.message || "Failed to add funds", "error");
        return rejectWithValue(res?.message);
      }

      ShowToast(res.message || "Funds added successfully", "success");

      return res; // { success, balance }
    } catch (error: any) {
      ShowToast("Something went wrong", "error");
      return rejectWithValue(error?.message);
    }
  },
);

export const fetchTransactions = createAsyncThunk(
  "wallet/fetchTransactions",
  async (params: any, { rejectWithValue }) => {
    try {
      const {
        mode,
        searchText,
        page,
        rowsPerPage,
        getApiTab,
      } = params;

      const queryParams = new URLSearchParams({
        tab: getApiTab(),
        mode: mode,
      });

      const response = await getApi({
        url: `${API_GET_TRANSACTIONS}?${queryParams.toString()}&`,
        page,
        rowsPerPage,
        searchText,
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  },
);
