import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPurchasedMedia } from "./Action";

interface PurchasedMediaState {
  items: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: PurchasedMediaState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
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
      });
  },
});

export const { resetPurchasedMedia } = purchasedMediaSlice.actions;

export default purchasedMediaSlice.reducer;
