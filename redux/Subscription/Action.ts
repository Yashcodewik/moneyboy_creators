import { createAsyncThunk } from "@reduxjs/toolkit";
import defaultAxios from "@/utils/api/axios";
import { API_UNLOCK_POST, API_SUBSCRIBE_CREATOR, API_SEND_TIP } from "@/utils/api/APIConstant";

/* ------------------- Unlock Post (PPV) ------------------- */
export const unlockPost = createAsyncThunk(
  "subscription/unlockPost",
  async (
    {
      postId,
      creatorId,
    }: {
      postId: string;
      creatorId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAxios.post(API_UNLOCK_POST, {
        postId,
        creatorId,
      });

      if (!res?.data?.success) {
        return rejectWithValue("Failed to unlock post");
      }

      return res.data; // { success, isUnlocked, postId }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
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
      const res = await defaultAxios.post(API_SUBSCRIBE_CREATOR, {
        creatorId,
        planType,
      });

      if (!res?.data?.success) {
        return rejectWithValue(
          res?.data?.message || "Failed to subscribe"
        );
      }

      return res.data; // { success, data: purchase }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);


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
      const res = await defaultAxios.post(API_SEND_TIP, {
        creatorId,
        amount,
        paymentMethod,
      });

      if (!res?.data?.success) {
        return rejectWithValue(
          res?.data?.message || "Failed to send tip"
        );
      }

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);