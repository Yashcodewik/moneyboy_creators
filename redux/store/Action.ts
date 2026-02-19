import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_GET_ALL_CREATORS,
  API_GET_MY_PAID_POSTS,
  API_GET_FEATURED_POSTS,
  API_GET_PAID_CONTENT_FEED,
} from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import ShowToast from "@/components/common/ShowToast";

/* ------------------- Creators ------------------- */
export const fetchAllCreators = createAsyncThunk(
  "creators/fetchAllCreators",
  async (
    {
      page = 1,
      limit = 9,
      creatorPublicId,
    }: {
      page?: number;
      limit?: number;
      creatorPublicId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const url = `${API_GET_ALL_CREATORS}?page=${page}&limit=${limit}${
        creatorPublicId ? `&creatorPublicId=${creatorPublicId}` : ""
      }`;

      const res = await getApiWithOutQuery({ url });

      if (!res?.data) {
        ShowToast("Failed to fetch creators", "error");
        return rejectWithValue("Failed to fetch creators");
      }

      return res;
    } catch (error: any) {
      ShowToast(error?.message || "Something went wrong", "error");
      return rejectWithValue(error?.message);
    }
  }
);

/* ------------------- Paid Posts (Creator Store) ------------------- */
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
      const url =
        `${API_GET_MY_PAID_POSTS}?page=${page}&limit=${limit}` +
        `&search=${search}&time=${time}` +
        (publicId ? `&publicId=${publicId}` : "");

      const res = await getApiWithOutQuery({ url });

      if (!res?.data) {
        ShowToast("Failed to fetch paid posts", "error");
        return rejectWithValue("Failed to fetch paid posts");
      }

      return res;
    } catch (error: any) {
      ShowToast(error?.message || "Something went wrong", "error");
      return rejectWithValue(error?.message);
    }
  }
);

/* ------------------- Featured Posts ------------------- */
export const fetchFeaturedPosts = createAsyncThunk(
  "creators/fetchFeaturedPosts",
  async (
    { limit = 5, publicId }: { limit?: number; publicId: string },
    { rejectWithValue }
  ) => {
    try {
      const url = `${API_GET_FEATURED_POSTS}?limit=${limit}&publicId=${publicId}`;

      const res = await getApiWithOutQuery({ url });

      if (!res?.data) {
        ShowToast("Failed to fetch featured posts", "error");
        return rejectWithValue("Failed to fetch featured posts");
      }

      return res;
    } catch (error: any) {
      ShowToast(error?.message || "Something went wrong", "error");
      return rejectWithValue(error?.message);
    }
  }
);

/* ------------------- 🔥 Paid Content Feed (GLOBAL) ------------------- */
export const fetchPaidContentFeed = createAsyncThunk(
  "creators/fetchPaidContentFeed",
  async (
    {
      page = 1,
      limit = 8,
      tab = "new",
      search = "",
      filter,
      sort,
    }: {
      page?: number;
      limit?: number;
      tab?: "trending" | "new" | "photo" | "video";
      search?: string;
      filter?: "subscriber" | "pay_per_view";
      sort?: "price_low" | "price_high";
    },
    { rejectWithValue }
  ) => {
    try {
      const url =
        `${API_GET_PAID_CONTENT_FEED}?page=${page}&limit=${limit}` +
        `&tab=${tab}` +
        (search ? `&search=${encodeURIComponent(search)}` : "") +
        (filter ? `&filter=${filter}` : "") +
        (sort ? `&sort=${sort}` : "");

      const res = await getApiWithOutQuery({ url });

      if (!res?.data) {
        ShowToast("Failed to fetch paid content feed", "error");
        return rejectWithValue("Failed to fetch paid content feed");
      }

      return res;
    } catch (error: any) {
      ShowToast(error?.message || "Something went wrong", "error");
      return rejectWithValue(error?.message);
    }
  }
);

