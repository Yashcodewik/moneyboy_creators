import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost } from "@/utils/endpoints/common";
import { API_PURCHASED_MEDIA } from "@/utils/api/APIConstant";


/**
 * Fetch purchased media
 */
export const fetchPurchasedMedia = createAsyncThunk(
  "purchasedMedia/fetchPurchasedMedia",
  async (
    {
      page = 1,
      limit = 12,
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
