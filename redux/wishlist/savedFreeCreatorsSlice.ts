import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_GET_SAVED_FREE_CREATORS } from "@/utils/api/APIConstant";

interface SavedFreeCreator {
  creatorUserId: string;
  displayName: string;
  userName: string;
  publicId: string;
  profile: string;
  savedCount: number;
  isSaved: boolean;
}

interface SavedFreeCreatorsState {
  creators: SavedFreeCreator[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: SavedFreeCreatorsState = {
  creators: [],
  page: 1,
  limit: 8,
  total: 0,
  totalPages: 1,
  loading: false,
  error: null,
};

/* ---------------- FETCH SAVED FREE CREATORS ---------------- */

export const fetchSavedFreeCreators = createAsyncThunk(
  "savedFreeCreators/fetch",
  async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      time?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const searchParams = new URLSearchParams();

      searchParams.append("page", String(params.page || 1));
      searchParams.append("limit", String(params.limit || 8));

      if (params.search) {
        searchParams.append("search", params.search);
      }
         if (params.time) {
        searchParams.append("time", params.time); // ✅ append time
      }

      const url = `${API_GET_SAVED_FREE_CREATORS}?${searchParams.toString()}`;
      const res = await getApiWithOutQuery({ url });

      if (!res?.success) {
        throw new Error(res?.message || "Failed to fetch saved creators");
      }

      return res;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch saved creators");
    }
  }
);

/* ---------------- SLICE ---------------- */

const savedFreeCreatorsSlice = createSlice({
  name: "savedFreeCreators",
  initialState,
  reducers: {
    resetSavedFreeCreators(state) {
      state.creators = [];
      state.page = 1;
      state.totalPages = 1;
      state.total = 0;
    },

    /* 🔥 Optimistic toggle (used if needed) */
    updateSavedFreeCreatorState(
      state,
      action: PayloadAction<{ creatorUserId: string; isSaved: boolean }>
    ) {
      const creator = state.creators.find(
        (c) => c.creatorUserId === action.payload.creatorUserId
      );

      if (creator) {
        creator.isSaved = action.payload.isSaved;
      }
    },

    /* 🔥 Optimistic REMOVE (instant UI) */
    removeSavedFreeCreator(
      state,
      action: PayloadAction<{ creatorUserId: string }>
    ) {
      state.creators = state.creators.filter(
        (c) => c.creatorUserId !== action.payload.creatorUserId
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedFreeCreators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* 🔥 FIXED: REPLACE creators instead of merging (search works) */
      .addCase(
        fetchSavedFreeCreators.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

          const incomingCreators: SavedFreeCreator[] = action.payload.data;

          // ✅ Only change: replace the creators array instead of merging
          state.creators = incomingCreators;

          state.page = action.payload.pagination.page;
          state.limit = action.payload.pagination.limit;
          state.total = action.payload.pagination.total;
          state.totalPages = action.payload.pagination.totalPages;
        }
      )

      .addCase(fetchSavedFreeCreators.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetSavedFreeCreators,
  updateSavedFreeCreatorState,
  removeSavedFreeCreator,
} = savedFreeCreatorsSlice.actions;

export default savedFreeCreatorsSlice.reducer;
