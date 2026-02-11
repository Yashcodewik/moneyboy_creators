import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllCreators,
  fetchMyPaidPosts,
  fetchFeaturedPosts,
} from "./Action";

/* ---------- Types ---------- */
interface Creator {
  _id: string;
  userName: string;
  displayName: string;
  publicId: string;
  profile?: string;
}

interface PaidPost {
  _id: string;
  text?: string;
  accessType: string;
  price?: number;
  media: any[];
  createdAt: string;
  userId: string;
  isUnlocked: boolean;
  isSubscribed: boolean;
  isSaved: boolean;
}

interface FeaturedPost extends PaidPost {
  likeCount: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

interface CreatorsState {
  /* creators */
  items: Creator[];
  loadingCreators: boolean;
  creatorsPagination: Pagination;

  /* paid posts */
  paidPosts: PaidPost[];
  loadingPaidPosts: boolean;
  paidPostsPagination: Pagination;

  /* featured posts */
  featuredPosts: FeaturedPost[];
  loadingFeaturedPosts: boolean;

  error: string | null;
}

/* ---------- Initial State ---------- */
const initialState: CreatorsState = {
  items: [],
  loadingCreators: false,
  creatorsPagination: {
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  },

  paidPosts: [],
  loadingPaidPosts: false,
  paidPostsPagination: {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  },

  featuredPosts: [],
  loadingFeaturedPosts: false,

  error: null,
};

/* ---------- Slice ---------- */
const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {
    resetCreatorsState: () => initialState,

    updateCreator: (
      state,
      action: PayloadAction<{
        creatorId: string;
        data: Partial<Creator>;
      }>
    ) => {
      const creator = state.items.find(
        (c) => c._id === action.payload.creatorId
      );
      if (creator) {
        Object.assign(creator, action.payload.data);
      }
    },

    removeCreator: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (c) => c._id !== action.payload
      );
      state.creatorsPagination.total = Math.max(
        0,
        state.creatorsPagination.total - 1
      );
    },
  },

  extraReducers: (builder) => {
    /* ---------- Creators ---------- */
    builder
      .addCase(fetchAllCreators.pending, (state) => {
        state.loadingCreators = true;
        state.error = null;
      })
      .addCase(fetchAllCreators.fulfilled, (state, action) => {
        state.loadingCreators = false;
        const { data, pagination } = action.payload;
        state.items = data;
        state.creatorsPagination = {
          ...pagination,
          hasNextPage: pagination.page < pagination.totalPages,
        };
      })
      .addCase(fetchAllCreators.rejected, (state, action) => {
        state.loadingCreators = false;
        state.error = action.payload as string;
      });

    /* ---------- Paid Posts ---------- */
    builder
      .addCase(fetchMyPaidPosts.pending, (state) => {
        state.loadingPaidPosts = true;
        state.error = null;
      })
      .addCase(fetchMyPaidPosts.fulfilled, (state, action) => {
        state.loadingPaidPosts = false;
        const { data, meta } = action.payload;
        state.paidPosts = data;
        state.paidPostsPagination = {
          page: meta.page,
          limit: meta.limit,
          total: meta.total,
          totalPages: meta.totalPages,
          hasNextPage: meta.page < meta.totalPages,
        };
      })
      .addCase(fetchMyPaidPosts.rejected, (state, action) => {
        state.loadingPaidPosts = false;
        state.error = action.payload as string;
      });

    /* ---------- Featured Posts ---------- */
    builder
      .addCase(fetchFeaturedPosts.pending, (state) => {
        state.loadingFeaturedPosts = true;
        state.error = null;
      })
      .addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
        state.loadingFeaturedPosts = false;
        state.featuredPosts = action.payload.data;
      })
      .addCase(fetchFeaturedPosts.rejected, (state, action) => {
        state.loadingFeaturedPosts = false;
        state.error = action.payload as string;
      });
  },
});

/* ---------- Exports ---------- */
export const {
  resetCreatorsState,
  updateCreator,
  removeCreator,
} = creatorsSlice.actions;

export default creatorsSlice.reducer;
