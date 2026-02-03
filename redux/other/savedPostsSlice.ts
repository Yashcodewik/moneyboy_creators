import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "@/utils/endpoints/common";
import {
  API_FREE_SAVE_POST,
  API_FREE_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";

interface SavedPost {
  saved: boolean;
  savedPostId?: string;
  creatorUserId?: string;
}

interface SavedPostState {
  savedPosts: Record<string, SavedPost>;
  loading: boolean;
  error: string | null;
}

const initialState: SavedPostState = {
  savedPosts: {},
  loading: false,
  error: null,
};

export const savePost = createAsyncThunk(
  "savedPosts/savePost",
  async (
    body: { postId?: string; creatorUserId?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiPost({
        url: API_FREE_SAVE_POST,
        values: body,
      });
      return res.data; // expected: { postId?, _id, saved, creatorUserId? }
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to save post");
    }
  },
);

export const unsavePost = createAsyncThunk(
  "savedPosts/unsavePost",
  async (
    body: { postId?: string; creatorUserId?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiPost({
        url: API_FREE_UNSAVE_POST,
        values: body,
      });
      return res.data; // expected: { postId?, creatorUserId?, removed? }
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to unsave post");
    }
  },
);

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        const { postId, _id, saved, creatorUserId } = action.payload;
        if (!postId) return;

        state.savedPosts[postId] = {
          saved: !!saved,
          savedPostId: _id,
          creatorUserId: creatorUserId,
        };

        ShowToast("Post saved successfully", "success");
      })

      .addCase(unsavePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsavePost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        const { postId, creatorUserId } = action.payload;

        if (postId) {
          delete state.savedPosts[postId];
        } else if (creatorUserId) {
          // Remove all posts by this creator
          Object.keys(state.savedPosts).forEach((pid) => {
            if (state.savedPosts[pid].creatorUserId === creatorUserId) {
              delete state.savedPosts[pid];
            }
          });
        }

        ShowToast("Post removed from saved", "success");
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
          if (state.error) {
            ShowToast(state.error, "error");
          }
        },
      );
  },
});

export default savedPostsSlice.reducer;
