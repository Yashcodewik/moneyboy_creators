import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLikedPosts } from "./Action";

interface LikedPostsState {
  items: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    totalPosts: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

const initialState: LikedPostsState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPosts: 0,
    totalPages: 0,
    hasNextPage: false,
  },
};

const likedPostsSlice = createSlice({
  name: "likedPosts",
  initialState,
  reducers: {
    resetLikedPosts: () => initialState,

    updateLikedPost: (
      state,
      action: PayloadAction<{
        postId: string;
        data: Partial<any>;
      }>
    ) => {
      const post = state.items.find(p => p._id === action.payload.postId);
      if (post) {
        Object.assign(post, action.payload.data);
      }
    },

    removeLikedPost: (
      state,
      action: PayloadAction<string>
    ) => {
      state.items = state.items.filter(p => p._id !== action.payload);
      state.pagination.totalPosts -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLikedPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, pagination } = action.payload;

        state.items =
          pagination.page === 1 ? posts : [...state.items, ...posts];
        state.pagination = pagination;
      })
      .addCase(fetchLikedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const {
  resetLikedPosts,
  updateLikedPost,
  removeLikedPost,
} = likedPostsSlice.actions;
export default likedPostsSlice.reducer;
