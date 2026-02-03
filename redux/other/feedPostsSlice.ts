import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  API_GET_POSTS,
  API_GET_FOLLOWING_POSTS,
  API_GET_POPULAR_POSTS,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";

interface FeedPostsState {
  posts: Record<string, any>;
  feedPage: number;
  followingPage: number;
  popularPage: number;
  hasMoreFeed: boolean;
  hasMoreFollowing: boolean;
  hasMorePopular: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: FeedPostsState = {
  posts: {},
  feedPage: 1,
  followingPage: 1,
  popularPage: 1,
  hasMoreFeed: true,
  hasMoreFollowing: true,
  hasMorePopular: true,
  loading: false,
  error: null,
};

/* ---------------- FETCH FEED POSTS ---------------- */

export const fetchFeedPosts = createAsyncThunk(
  "feedPosts/fetchFeed",
  async ({ userId, page, limit }: any) => {
    const res = await apiPost({
      url: API_GET_POSTS,
      values: { userId, page, limit },
    });

    const posts = Array.isArray(res) ? res : [];
    const rawLength = posts.length;

    return {
      posts,
      page,
      hasMore: rawLength === limit,
      source: "feed",
    };
  }
);

/* ---------------- FETCH FOLLOWING POSTS ---------------- */

export const fetchFollowingPosts = createAsyncThunk(
  "feedPosts/fetchFollowing",
  async ({ page, limit }: any) => {
    const res = await getApiWithOutQuery({
      url: `${API_GET_FOLLOWING_POSTS}?page=${page}&limit=${limit}`,
    });

    const posts = Array.isArray(res?.posts) ? res.posts : [];
    const rawLength = posts.length;

    return {
      posts,
      page,
      hasMore: rawLength === limit,
      source: "following",
    };
  }
);

/* ---------------- FETCH POPULAR POSTS ---------------- */

export const fetchPopularPosts = createAsyncThunk(
  "feedPosts/fetchPopular",
  async ({ userId, page, limit }: any) => {
    const res = await apiPost({
      url: API_GET_POPULAR_POSTS,
      values: { userId, page, limit },
    });

    const posts = Array.isArray(res) ? res : [];
    const rawLength = posts.length;

    return {
      posts,
      page,
      hasMore: rawLength === limit,
      source: "popular",
    };
  }
);

/* ---------------- SLICE ---------------- */

const feedPostsSlice = createSlice({
  name: "feedPosts",
  initialState,
  reducers: {
    /* 🔥 Optimistic update reducer (used for save / unsave / like etc.) */
    updateFeedPost(
      state,
      action: PayloadAction<{ postId: string; data: any }>
    ) {
      const post = state.posts[action.payload.postId];
      if (post) {
        state.posts[action.payload.postId] = {
          ...post,
          ...action.payload.data,
        };
      }
    },

    incrementFeedPostCommentCount(state, action: PayloadAction<string>) {
      const post = state.posts[action.payload];
      if (post) {
        post.commentCount = (post.commentCount || 0) + 1;
      }
    },

    resetFeedPosts(state) {
      state.posts = {};
      state.feedPage = 1;
      state.followingPage = 1;
      state.popularPage = 1;
      state.hasMoreFeed = true;
      state.hasMoreFollowing = true;
      state.hasMorePopular = true;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.loading = false;

        action.payload.posts.forEach((post: any) => {
          state.posts[post._id] = {
            ...post,
            source: "feed",
          };
        });

        state.feedPage = action.payload.page;
        state.hasMoreFeed = action.payload.hasMore;
      })

      .addCase(fetchFollowingPosts.fulfilled, (state, action) => {
        action.payload.posts.forEach((post: any) => {
          state.posts[post._id] = {
            ...post,
            source: "following",
          };
        });

        state.followingPage = action.payload.page;
        state.hasMoreFollowing = action.payload.hasMore;
      })

      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        action.payload.posts.forEach((post: any) => {
          state.posts[post._id] = {
            ...post,
            source: "popular",
          };
        });

        state.popularPage = action.payload.page;
        state.hasMorePopular = action.payload.hasMore;
      })

      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load feed posts";
      });
  },
});

export const {
  updateFeedPost,
  incrementFeedPostCommentCount,
  resetFeedPosts,
} = feedPostsSlice.actions;

export default feedPostsSlice.reducer;
