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
      if (params.userPublicId)
        searchParams.append("userPublicId", params.userPublicId);

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

    // 🔥 THIS IS THE IMPORTANT PART
    updateCreatorSavedState(
      state,
      action: PayloadAction<{ creatorId: string; saved: boolean }>
    ) {
      const creator = state.creators.find(
        (c) => c._id === action.payload.creatorId
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
      .addCase(fetchDiscoverCreators.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.creators = action.payload.data;
        state.totalPages = action.payload.meta.totalPages;
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
} = discoverCreatorsSlice.actions;

export default discoverCreatorsSlice.reducer;
