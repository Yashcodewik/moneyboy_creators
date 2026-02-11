import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllCreators,
  fetchMyPaidPosts,
  fetchFeaturedPosts,
  fetchPaidContentFeed,
} from "./Action";
import { savePost, unsavePost } from "../other/savedPostsSlice";

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
  media: any;
  createdAt: string;
  userId: string;
  isUnlocked?: boolean;
  isSubscribed?: boolean;
  isSaved?: boolean;
  creatorInfo: Creator; 
  publicId:string;
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
  items: Creator[];
  loadingCreators: boolean;
  creatorsPagination: Pagination;

  paidPosts: PaidPost[];
  loadingPaidPosts: boolean;
  paidPostsPagination: Pagination;

  paidContentFeed: PaidPost[];
  loadingPaidContentFeed: boolean;
  paidContentFeedPagination: Pagination;

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

  /* 🔥 NEW Paid Content Feed */
  paidContentFeed: [],
  loadingPaidContentFeed: false,
  paidContentFeedPagination: {
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

    /* ---------- Paid Posts (Creator Specific) ---------- */
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

    /* ---------- 🔥 Paid Content Feed (Global Locked Feed) ---------- */
    builder
      .addCase(fetchPaidContentFeed.pending, (state) => {
        state.loadingPaidContentFeed = true;
        state.error = null;
      })
      .addCase(fetchPaidContentFeed.fulfilled, (state, action) => {
        state.loadingPaidContentFeed = false;

        const { data, total, page, totalPages } = action.payload;

        state.paidContentFeed = data;

        state.paidContentFeedPagination = {
          page,
          limit: state.paidContentFeedPagination.limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
        };
      })
      .addCase(fetchPaidContentFeed.rejected, (state, action) => {
        state.loadingPaidContentFeed = false;
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

    /* ---------- Save / Unsave (Instant UI Sync) ---------- */
    builder
      .addCase(savePost.fulfilled, (state, action: any) => {
        const postId = action.payload?.postId;
        if (!postId) return;

        const updateSaved = (list: PaidPost[]) => {
          const post = list.find((p) => p._id === postId);
          if (post) post.isSaved = true;
        };

        updateSaved(state.paidPosts);
        updateSaved(state.featuredPosts);
        updateSaved(state.paidContentFeed);
      })
      .addCase(unsavePost.fulfilled, (state, action: any) => {
        const postId = action.payload?.postId;
        if (!postId) return;

        const updateUnsaved = (list: PaidPost[]) => {
          const post = list.find((p) => p._id === postId);
          if (post) post.isSaved = false;
        };

        updateUnsaved(state.paidPosts);
        updateUnsaved(state.featuredPosts);
        updateUnsaved(state.paidContentFeed);
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
