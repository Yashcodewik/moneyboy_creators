import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost } from "@/utils/endpoints/common";
import { API_GET_PURCHASED_MEDIA_CREATORS, API_PURCHASED_MEDIA, API_TOGGLE_WATCH_LATER, API_UPDATE_VIDEO_PROGRESS } from "@/utils/api/APIConstant";


/**
 * Fetch purchased media
 */
export const fetchPurchasedMedia = createAsyncThunk(
  "purchasedMedia/fetchPurchasedMedia",
  async (
    {
      page = 1,
      limit = 4,
      search = "",
      tab = "all-media",
      creatorId,
    }: {
      page?: number;
      limit?: number;
      search?: string;
      tab?: string;
      creatorId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiPost({
        url: API_PURCHASED_MEDIA,
        values: {
          page,
          limit,
          search,
          tab,
          creatorId,
        },
      });

      if (!res?.success) {
        return rejectWithValue(res?.message || "Failed to fetch purchased media");
      }

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateVideoProgress = createAsyncThunk(
  "videoProgress/updateVideoProgress",
  async (
    {
      postId,
      watchedSeconds,
      duration,
    }: {
      postId: string;
      watchedSeconds: number;
      duration: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiPost({
        url: API_UPDATE_VIDEO_PROGRESS,
        values: {
          postId,
          watchedSeconds,
          duration,
        },
      });

      if (!res?.success) {
        return rejectWithValue(res?.message || "Failed to update video progress");
      }

      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchPurchasedMediaCreators = createAsyncThunk(
  "purchasedMediaCreators/fetchPurchasedMediaCreators",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiPost({
        url: API_GET_PURCHASED_MEDIA_CREATORS,
        values: {},
      });

      if (!res?.success) {
        return rejectWithValue(
          res?.message || "Failed to fetch purchased media creators"
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

export const toggleWatchLater = createAsyncThunk(
  "purchasedMedia/toggleWatchLater",
  async (
    { postId }: { postId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiPost({
        url: API_TOGGLE_WATCH_LATER,
        values: { postId },
      });

      if (!res?.success) {
        return rejectWithValue(
          res?.message || "Failed to toggle watch later"
        );
      }

      return {
        postId,
        isWatchLater: res.data.isWatchLater,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

