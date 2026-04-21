import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost, getApi, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_GET_WALLET,
  API_ADD_WALLET,
  API_GET_TRANSACTIONS,
} from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";
import { showError } from "@/utils/alert";

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getApiWithOutQuery({
        url: API_GET_WALLET,
      });

      if (!res?.success) {
        showError(res?.message || "Failed to fetch wallet");
        return rejectWithValue(res?.message);
      }

      return res; // { success, balance }
    } catch (error: any) {
      showError(error?.message || "Something went wrong");
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
        showError(res?.message || "Failed to add funds");
        return rejectWithValue(res?.message);
      }

      showError(res.message || "Funds added successfully");

      return res; // { success, balance }
    } catch (error: any) {
      showError(error?.message || "Something went wrong");
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
