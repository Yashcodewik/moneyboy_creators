import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiPost } from "@/utils/endpoints/common";
import {
  API_FREE_SAVE_POST,
  API_FREE_UNSAVE_POST,
} from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";

interface SavedPostState {
  loading: boolean;
  error: string | null;
}

const initialState: SavedPostState = {
  loading: false,
  error: null,
};

// ================================
// SAVE POST
// ================================
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

      return {
        postId: body.postId, // ensure postId always exists
        ...res.data,
      };
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to save post");
    }
  },
);

// ================================
// UNSAVE POST
// ================================
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

      return {
        postId: body.postId, // ensure postId always exists
        ...res.data,
      };
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
      .addCase(savePost.fulfilled, (state) => {
        state.loading = false;
        // ShowToast("Post saved successfully", "success");
      })

      
      .addCase(unsavePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsavePost.fulfilled, (state) => {
        state.loading = false;
        // ShowToast("Post removed from saved", "success");
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
