import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "@/utils/endpoints/common";
import {
  API_FREE_SAVE_POST,
  API_FREE_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";

interface SavedPostState {
  savedPosts: Record<
    string,
    {
      saved: boolean;
      savedPostId?: string;
    }
  >;
  loading: boolean;
  error: string | null;
}

const initialState: SavedPostState = {
  savedPosts: {}, // nothing is saved initially
  loading: false,
  error: null,
};

/* ============================
   SAVE POST
============================ */
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
      return res.data; // expected: { postId, _id, isSaved }
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to save post");
    }
  },
);

/* ============================
   UNSAVE POST
============================ */
export const unsavePost = createAsyncThunk(
  "savedPosts/unsavePost",
  async (body: { postId: string }, { rejectWithValue }) => {
    try {
      const res = await apiPost({
        url: API_FREE_UNSAVE_POST,
        values: body,
      });
      return res.data; // expected: { postId }
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to unsave post");
    }
  },
);

/* ============================
   SLICE
============================ */
const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* -------- SAVE -------- */
      .addCase(savePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        const { postId, _id, saved } = action.payload; // Changed from isSaved to saved
        if (!postId) return;

        // Only mark saved if API says so
        state.savedPosts[postId] = {
          saved: !!saved, // Use 'saved' from backend
          savedPostId: _id,
        };

        ShowToast("Post saved successfully", "success");
      })

      // Update unsavePost.fulfilled case
      .addCase(unsavePost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        const { postId, saved } = action.payload; // Add saved from response
        if (!postId) return;

        // Remove from saved posts
        delete state.savedPosts[postId];

        ShowToast("Post removed from saved", "success");
      })

      /* -------- ERROR (shared) -------- */
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
