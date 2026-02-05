import { createAsyncThunk } from "@reduxjs/toolkit";
import defaultAxios from "@/utils/api/axios";
import { API_GET_LIKED_POSTS } from "@/utils/api/APIConstant";


export const fetchLikedPosts = createAsyncThunk(
  "likedPosts/fetchLikedPosts",
  async (
    {
      page = 1,
      limit = 10,
      search = "",
      time = "all_time",
      type = "all",
    }: {
      page?: number;
      limit?: number;
      search?: string;
      time?: string;
      type?: "video" | "photo" | "all";
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await defaultAxios.get(API_GET_LIKED_POSTS, {
        params: {
          page,
          rowsPerPage: limit,
          q: search,
          time,
          type,
        },
      });

      if (!res?.data?.success) {
        return rejectWithValue(
          res?.data?.message || "Failed to fetch liked posts"
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
