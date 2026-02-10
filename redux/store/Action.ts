import { createAsyncThunk } from "@reduxjs/toolkit";
import defaultAxios from "@/utils/api/axios";
import {
  API_GET_ALL_CREATORS,
  API_GET_MY_PAID_POSTS,
  API_GET_FEATURED_POSTS,
} from "@/utils/api/APIConstant";

/* ------------------- Creators ------------------- */
export const fetchAllCreators = createAsyncThunk(
  "creators/fetchAllCreators",
  async (
    { page = 1, limit = 9 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAxios.get(API_GET_ALL_CREATORS, {
        params: { page, limit },
      });

      if (!res?.data?.data) {
        return rejectWithValue("Failed to fetch creators");
      }

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

/* ------------------- Paid Posts ------------------- */
export const fetchMyPaidPosts = createAsyncThunk(
  "creators/fetchMyPaidPosts",
  async (
    {
      page = 1,
      limit = 8,
      publicId,
      search = "",
      time = "all_time",
    }: {
      page?: number;
      limit?: number;
      publicId?: string;
      search?: string;
      time?: "most_recent" | "today" | "last_7_days" | "last_30_days" | "all_time";
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAxios.get(API_GET_MY_PAID_POSTS, {
        params: {
          page,
          limit,
          search,
          time,
          ...(publicId ? { publicId } : {}),
        },
      });

      if (!res?.data?.data) {
        return rejectWithValue("Failed to fetch paid posts");
      }

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

/* ------------------- Featured Posts ------------------- */
export const fetchFeaturedPosts = createAsyncThunk(
  "creators/fetchFeaturedPosts",
  async (
    {
      limit = 5,
      publicId,
    }: { limit?: number; publicId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAxios.get(API_GET_FEATURED_POSTS, {
        params: {
          limit,
          publicId, // ✅ PASS CREATOR
        },
      });

      if (!res?.data?.data) {
        return rejectWithValue("Failed to fetch featured posts");
      }

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

