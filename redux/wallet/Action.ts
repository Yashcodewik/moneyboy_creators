import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_GET_WALLET, API_ADD_WALLET } from "@/utils/api/APIConstant";
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
  }
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
    { rejectWithValue }
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
  }
);