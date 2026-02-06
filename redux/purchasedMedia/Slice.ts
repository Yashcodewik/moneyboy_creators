import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPurchasedMedia, fetchPurchasedMediaCreators, updateVideoProgress, toggleWatchLater } from "./Action";

interface Creator {
  _id: string;
  displayName: string;
  userName: string;
  avatar?: string;
}

interface PurchasedMediaState {
  items: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };

  videoProgress: {
    loading: boolean;
    error: string | null;
  };

  creators: {
    items: Creator[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: PurchasedMediaState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 4,
    total: 0,
  },

  videoProgress: {
    loading: false,
    error: null,
  },

  creators: {
    items: [],
    loading: false,
    error: null,
  },
};

const purchasedMediaSlice = createSlice({
  name: "purchasedMedia",
  initialState,
  reducers: {
    resetPurchasedMedia: (state) => {
      state.items = [];
      state.pagination = initialState.pagination;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ----------------------------------
         FETCH PURCHASED MEDIA
      ---------------------------------- */
      .addCase(fetchPurchasedMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPurchasedMedia.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: any[];
            pagination: { page: number; limit: number; total: number };
          }>
        ) => {
          state.loading = false;
          state.items = action.payload.items;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchPurchasedMedia.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch purchased media";
      })
      /* ----------------------------------
         UPDATE VIDEO PROGRESS
      ---------------------------------- */
      .addCase(updateVideoProgress.pending, (state) => {
        state.videoProgress.loading = true;
        state.videoProgress.error = null;
      })
      .addCase(updateVideoProgress.fulfilled, (state) => {
        state.videoProgress.loading = false;
      })
      .addCase(updateVideoProgress.rejected, (state, action) => {
        state.videoProgress.loading = false;
        state.videoProgress.error =
          (action.payload as string) || "Failed to update video progress";
      })
      /* ----------------------------------
         FETCH PURCHASED MEDIA CREATORS
      ---------------------------------- */
      .addCase(fetchPurchasedMediaCreators.pending, (state) => {
        state.creators.loading = true;
        state.creators.error = null;
      })
      .addCase(
        fetchPurchasedMediaCreators.fulfilled,
        (state, action: PayloadAction<Creator[]>) => {
          state.creators.loading = false;
          state.creators.items = action.payload;
        }
      )
      .addCase(fetchPurchasedMediaCreators.rejected, (state, action) => {
        state.creators.loading = false;
        state.creators.error =
          (action.payload as string) ||
          "Failed to fetch purchased media creators";
      })
      .addCase(toggleWatchLater.pending, (state) => {
        state.error = null;
      })
      .addCase(
        toggleWatchLater.fulfilled,
        (
          state,
            action: PayloadAction<{ postId: string; isWatchLater: boolean }>
          ) => {
            const { postId, isWatchLater } = action.payload;

            const item = state.items.find((i) => i._id === postId);
            if (item) {
              item.isWatchLater = isWatchLater;
            }

            // Optional: auto-remove from watch-later tab
            if (!isWatchLater) {
              state.items = state.items.filter((i) => i._id !== postId);
            }
          }
        )
        .addCase(toggleWatchLater.rejected, (state, action) => {
          state.error =
            (action.payload as string) || "Failed to toggle watch later";
        });
  },
});

export const { resetPurchasedMedia } = purchasedMediaSlice.actions;

export default purchasedMediaSlice.reducer;
