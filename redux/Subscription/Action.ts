import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_UNLOCK_POST,
  API_SUBSCRIBE_CREATOR,
  API_SEND_TIP,
} from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";

/* ------------------- Unlock Post (PPV) ------------------- */
export const unlockPost = createAsyncThunk(
  "subscription/unlockPost",
  async (
    {
      postId,
      creatorId,
      paymentMethod,
    }: {
      postId: string;
      creatorId: string;
      paymentMethod: "wallet" | "card";
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiPost({
        url: API_UNLOCK_POST,
        values: {
          postId,
          creatorId,
          paymentMethod,
        },
      });

      if (!res?.success) {
        return rejectWithValue(
          res?.message || res?.error || "Failed to unlock post"
        );
      }

      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || "Something went wrong"
      );
    }
  }
);

/* ------------------- Subscribe Creator ------------------- */
export const subscribeCreator = createAsyncThunk(
  "subscription/subscribeCreator",
  async (
    {
      creatorId,
      planType,
    }: {
      creatorId: string;
      planType: "MONTHLY" | "YEARLY";
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiPost({
        url: API_SUBSCRIBE_CREATOR,
        values: {
          creatorId,
          planType,
        },
      });

      if (!res?.success) {
        return rejectWithValue(
          res?.message || res?.error || "Failed to subscribe"
        );
      }

      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || "Something went wrong"
      );
    }
  }
);

/* ------------------- Send Tip ------------------- */
export const sendTip = createAsyncThunk(
  "subscription/sendTip",
  async (
    {
      creatorId,
      amount,
      paymentMethod,
    }: {
      creatorId: string;
      amount: number;
      paymentMethod: "wallet" | "card";
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiPost({
        url: API_SEND_TIP,
        values: {
          creatorId,
          amount,
          paymentMethod,
        },
      });

      if (!res?.success) {
        return rejectWithValue(
          res?.message || res?.error || "Failed to send tip"
        );
      }

      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || "Something went wrong"
      );
    }
  }
);