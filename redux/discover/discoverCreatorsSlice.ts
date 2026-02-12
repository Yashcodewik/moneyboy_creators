import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_GET_DISCOVER_CREATORS } from "@/utils/api/APIConstant";

interface DiscoverCreatorsState {
  creators: any[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: DiscoverCreatorsState = {
  creators: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchDiscoverCreators = createAsyncThunk(
  "discoverCreators/fetch",
  async (
    params: {
      page: number;
      search?: string;
      userPublicId?: string;
      filters?: Record<string, string>;
    },
    { rejectWithValue },
  ) => {
    try {
      const searchParams = new URLSearchParams();

      searchParams.append("page", String(params.page));
      searchParams.append("rowsPerPage", "8");

      if (params.search) searchParams.append("q", params.search);
      if (params.userPublicId) {
        searchParams.append("userPublicId", params.userPublicId);
      }

      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value && value !== "all") {
            searchParams.append(key, value);
          }
        });
      }

      const url = `${API_GET_DISCOVER_CREATORS}?${searchParams.toString()}`;
      const res = await getApiWithOutQuery({ url });

      return res;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch creators");
    }
  },
);

const discoverCreatorsSlice = createSlice({
  name: "discoverCreators",
  initialState,
  reducers: {
    resetCreators(state) {
      state.creators = [];
      state.page = 1;
      state.totalPages = 1;
    },

    // ✅ NEW: Update page state
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    // 🔥 Optimistic Save / Unsave
    updateCreatorSavedState(
      state,
      action: PayloadAction<{ creatorId: string; saved: boolean }>,
    ) {
      const creator = state.creators.find(
        (c) => c.creatorUserId === action.payload.creatorId,
      );

      if (creator) {
        creator.issaved = action.payload.saved;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscoverCreators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDiscoverCreators.fulfilled, (state, action) => {
        state.loading = false;

        const incomingCreators = action.payload.data;

        state.creators = incomingCreators.map((newCreator: any) => {
          const existingCreator = state.creators.find(
            (c) => c.creatorUserId === newCreator.creatorUserId,
          );

          return {
            ...newCreator,
            issaved: existingCreator?.issaved ?? newCreator.issaved,
          };
        });

        state.totalPages = action.payload.meta.totalPages;

        // ✅ IMPORTANT FIX: update page from request
        state.page = action.meta.arg.page;
      })

      .addCase(fetchDiscoverCreators.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetCreators,
  updateCreatorSavedState,
  setPage, // 👈 EXPORT THIS
} = discoverCreatorsSlice.actions;

export default discoverCreatorsSlice.reducer;
