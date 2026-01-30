import { API_ADD_COMMENT, API_ADD_REPLY, API_DISLIKE_COMMENT, API_GET_COMMENTS, API_LIKE_COMMENT } from "@/utils/api/APIConstant";
import { apiPost, getApiByParams } from "@/utils/endpoints/common";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface CommentState {
  comments: Record<string, any[]>; // { postId: [comments] }
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: {},
  loading: false,
  error: null,
};

// Fetch comments for a post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId: string) => {
    const res = await getApiByParams({ url: API_GET_COMMENTS, params: postId });
    return { postId, comments: res.comments };
  }
);

// Add comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, comment }: { postId: string; comment: string }) => {
    const res = await apiPost({ url: API_ADD_COMMENT, values: { postId, comment } });
    return { postId, comment: res.comment };
  }
);

// Add reply
export const addReply = createAsyncThunk(
  "comments/addReply",
  async ({ commentId, comment }: { commentId: string; comment: string }) => {
    const res = await apiPost({ url: `${API_ADD_REPLY}/${commentId}/reply`, values: { comment } });
    return { commentId, reply: res.reply };
  }
);

// Like a comment
export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async ({ commentId }: { commentId: string }) => {
    const res = await apiPost({ url: `${API_LIKE_COMMENT}/${commentId}/like`, values: {} });
    return { commentId, updatedComment: res.comment };
  }
);

// Dislike a comment
export const dislikeComment = createAsyncThunk(
  "comments/dislikeComment",
  async ({ commentId }: { commentId: string }) => {
    const res = await apiPost({ url: `${API_DISLIKE_COMMENT}/${commentId}/dislike`, values: {} });
    return { commentId, updatedComment: res.comment };
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => { state.loading = true; })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<{ postId: string; comments: any[] }>) => {
        state.loading = false;
        state.comments[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (!state.comments[action.payload.postId]) state.comments[action.payload.postId] = [];
        state.comments[action.payload.postId].unshift(action.payload.comment);
      })
      .addCase(addReply.fulfilled, (state, action) => {
        // Find the parent comment and add reply
        for (const postId in state.comments) {
          const comment = state.comments[postId].find((c) => c._id === action.payload.commentId);
          if (comment) comment.replies.push(action.payload.reply);
        }
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        for (const postId in state.comments) {
          const index = state.comments[postId].findIndex((c) => c._id === action.payload.commentId);
          if (index > -1) state.comments[postId][index] = action.payload.updatedComment;
        }
      })
      .addCase(dislikeComment.fulfilled, (state, action) => {
        for (const postId in state.comments) {
          const index = state.comments[postId].findIndex((c) => c._id === action.payload.commentId);
          if (index > -1) state.comments[postId][index] = action.payload.updatedComment;
        }
      });
      
  },
});

export default commentSlice.reducer;
