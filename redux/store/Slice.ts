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
  publicId: string;
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

const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {
    resetCreatorsState: () => initialState,
  },

  extraReducers: (builder) => {
    /* ---------- Creators ---------- */
    builder
      .addCase(fetchAllCreators.pending, (state) => {
        state.loadingCreators = true;
      })
      .addCase(fetchAllCreators.fulfilled, (state, action) => {
        state.loadingCreators = false;
        const { data, pagination } = action.payload;
        state.items = data;
        state.creatorsPagination = {
          ...pagination,
          hasNextPage: pagination.page < pagination.totalPages,
        };
      });

    /* ---------- Paid Posts ---------- */
    builder
      .addCase(fetchMyPaidPosts.pending, (state) => {
        state.loadingPaidPosts = true;
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
      });

    /* ---------- Paid Content Feed ---------- */
    builder
      .addCase(fetchPaidContentFeed.pending, (state) => {
        state.loadingPaidContentFeed = true;
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
      });

    /* ---------- Featured ---------- */
    builder.addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
      state.featuredPosts = action.payload.data;
    });

    /* ---------- Save / Unsave ---------- */
    builder
      .addCase(savePost.fulfilled, (state, action: any) => {
        const postId = action.payload?.postId;
        if (!postId) return;

        const update = (list: PaidPost[]) => {
          const post = list.find((p) => p._id === postId);
          if (post) post.isSaved = true;
        };

        update(state.paidPosts);
        update(state.paidContentFeed);
        update(state.featuredPosts);
      })
      .addCase(unsavePost.fulfilled, (state, action: any) => {
        const postId = action.payload?.postId;
        if (!postId) return;

        const update = (list: PaidPost[]) => {
          const post = list.find((p) => p._id === postId);
          if (post) post.isSaved = false;
        };

        update(state.paidPosts);
        update(state.paidContentFeed);
        update(state.featuredPosts);
      });
  },
});

export const { resetCreatorsState } = creatorsSlice.actions;
export default creatorsSlice.reducer;
