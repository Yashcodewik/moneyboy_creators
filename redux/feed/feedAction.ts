import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost } from "@/utils/endpoints/common";
import {
  API_LIKE_POST,
  API_UNLIKE_POST,
  API_DISLIKE_POST,
  API_POST_VIEW,
} from "@/utils/api/APIConstant";

export const likePostAction = createAsyncThunk(
  "feed/likePost",
  async (postId: string) => {
    const res = await apiPost({
      url: API_LIKE_POST,
      values: { postId },
    });
    return { postId, response: res };
  }
);

export const dislikePostAction = createAsyncThunk(
  "feed/dislikePost",
  async (postId: string) => {
    const res = await apiPost({
      url: API_DISLIKE_POST,
      values: { postId },
    });
    return { postId, response: res };
  }
);


export const removeReactionAction = createAsyncThunk(
  "feed/removeReaction",
  async (postId: string) => {
    const res = await apiPost({
      url: API_UNLIKE_POST,
      values: { postId },
    });
    return { postId, response: res };
  }
);

export const addPostViewAction = createAsyncThunk<
  { publicId: string }, // 👈 FIXED
  string
>(
  "feed/addPostView",
  async (publicId, { rejectWithValue }) => {
     console.log("🚀 Calling view API for:", publicId);
    try {
      await apiPost({
        url: `${API_POST_VIEW}/${publicId}`,
        values: {},
      });

      console.log("👁 View API called:", publicId);

      return { publicId }; // 👈 FIXED
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

