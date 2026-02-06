import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_GET_SAVED_LOCKED_POSTS } from "@/utils/api/APIConstant";



export interface LockedPostMedia {
  type: "photo" | "video";
  mediaFiles: string[];
}

export interface LockedPostCreator {
  _id: string;
  publicId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  userName: string;
  profile: string;
  coverImage: string;
  country: string;
  city: string;
  status: string;
}

export interface LockedPost {
  post: {
    _id: string;
    publicId: string;
    text: string;
    accessType: "SUBSCRIBER" | "PAY_PER_VIEW";
    price: number;
    thumbnail: string;
    likeCount: number;
    commentCount: number;
    viewCount: number;
    createdAt: string;
  };
  media: LockedPostMedia[];
  creator: LockedPostCreator;
  savedAt: string;
}

interface SavedLockedPostsState {
  posts: LockedPost[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}



const initialState: SavedLockedPostsState = {
  posts: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  loading: false,
  error: null,
};



export const fetchSavedLockedPosts = createAsyncThunk(
  "savedLockedPosts/fetch",
  async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      type?: "photo" | "video";
    },
    { rejectWithValue }
  ) => {
    try {
      const searchParams = new URLSearchParams();

      searchParams.append("page", String(params.page || 1));
      searchParams.append("limit", String(params.limit || 10));

      if (params.search) {
        searchParams.append("search", params.search);
      }

      if (params.type) {
        searchParams.append("type", params.type); // photo | video
      }

      const url = `${API_GET_SAVED_LOCKED_POSTS}?${searchParams.toString()}`;
      const res = await getApiWithOutQuery({ url });

      if (!res?.success) {
        // throw new Error(res?.message || "Failed to fetch locked posts");
      }

      return res;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch locked posts");
    }
  }
);



const savedLockedPostsSlice = createSlice({
  name: "savedLockedPosts",
  initialState,
  reducers: {
    resetSavedLockedPosts(state) {
      state.posts = [];
      state.page = 1;
      state.total = 0;
      state.totalPages = 1;
    },

    /* 🔥 Optimistic remove saved post */
    removeSavedLockedPost(
      state,
      action: PayloadAction<{ postId: string }>
    ) {
      state.posts = state.posts.filter(
        (p) => p.post._id !== action.payload.postId
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedLockedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* ✅ Replace posts (pagination + search safe) */
      .addCase(
        fetchSavedLockedPosts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

          state.posts = action.payload.data;
          state.page = action.payload.pagination.page;
          state.limit = action.payload.pagination.limit;
          state.total = action.payload.pagination.total;
          state.totalPages = action.payload.pagination.totalPages;
        }
      )

      .addCase(fetchSavedLockedPosts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* =========================
   EXPORTS
   ========================= */

export const {
  resetSavedLockedPosts,
  removeSavedLockedPost,
} = savedLockedPostsSlice.actions;

export default savedLockedPostsSlice.reducer;
