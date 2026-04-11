import {
  API_ADD_COMMENT,
  API_ADD_REPLY,
  API_DISLIKE_COMMENT,
  API_GET_COMMENTS,
  API_LIKE_COMMENT,
} from "@/utils/api/APIConstant";
import { apiPost, getApiByParams } from "@/utils/endpoints/common";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CommentState {
  comments: Record<string, any[]>; // { postId: [comments] }
  loading: boolean;
  error: string | null;
}

type CommentActionPayload = {
  commentId: string;
  currentUserId?: string | null;
};

type FetchCommentsPayload =
  | string
  | {
      postId: string;
      currentUserId?: string | null;
    };

const initialState: CommentState = {
  comments: {},
  loading: false,
  error: null,
};

const getReactionCount = (
  count: number | undefined,
  users: any[] | undefined,
) => (typeof count === "number" ? count : users?.length || 0);

const normalizeComment = (comment: any, currentUserId?: string | null) => {
  const likeCount = getReactionCount(comment?.likeCount, comment?.likes);
  const dislikeCount = getReactionCount(
    comment?.dislikeCount,
    comment?.dislikes,
  );
  const isLiked =
    currentUserId != null
      ? Boolean(
          comment?.likes?.some((user: any) => user?._id === currentUserId),
        )
      : Boolean(comment?.isLiked);
  const isDisliked =
    currentUserId != null
      ? Boolean(
          comment?.dislikes?.some((user: any) => user?._id === currentUserId),
        )
      : Boolean(comment?.isDisliked);

  return {
    ...comment,
    likeCount,
    dislikeCount,
    isLiked,
    isDisliked,
  };
};

const mergeUpdatedComment = (
  existingComment: any,
  updatedComment: any,
  currentUserId?: string | null,
) => {
  return {
    ...existingComment,
    ...updatedComment,

    isLiked:
      typeof updatedComment?.isLiked === "boolean"
        ? updatedComment.isLiked
        : existingComment.isLiked,

    isDisliked:
      typeof updatedComment?.isDisliked === "boolean"
        ? updatedComment.isDisliked
        : existingComment.isDisliked,

    // ✅ Optional fallback (only if backend doesn’t send flags)
    ...(currentUserId && {
      isLiked:
        typeof updatedComment?.isLiked === "boolean"
          ? updatedComment.isLiked
          : updatedComment?.likes?.some((u: any) =>
              u?._id
                ? u._id.toString() === currentUserId
                : u.toString() === currentUserId,
            ),

      isDisliked:
        typeof updatedComment?.isDisliked === "boolean"
          ? updatedComment.isDisliked
          : updatedComment?.dislikes?.some((u: any) =>
              u?._id
                ? u._id.toString() === currentUserId
                : u.toString() === currentUserId,
            ),
    }),
  };
};

const findComment = (state: CommentState, commentId: string) => {
  for (const postId in state.comments) {
    const comment = state.comments[postId].find(
      (item) => item._id === commentId,
    );
    if (comment) {
      return comment;
    }
  }

  return null;
};

// Fetch comments for a post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (payload: FetchCommentsPayload) => {
    const postId = typeof payload === "string" ? payload : payload.postId;
    const currentUserId =
      typeof payload === "string" ? undefined : payload.currentUserId;
    const res = await getApiByParams({ url: API_GET_COMMENTS, params: postId });
    return {
      postId,
      comments: (res.comments || []).map((comment: any) =>
        normalizeComment(comment, currentUserId),
      ),
    };
  },
);

// Add comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, comment }: { postId: string; comment: string }) => {
    const res = await apiPost({
      url: API_ADD_COMMENT,
      values: { postId, comment },
    });
    return { postId, comment: res.comment };
  },
);

// Add reply
export const addReply = createAsyncThunk(
  "comments/addReply",
  async ({ commentId, comment }: { commentId: string; comment: string }) => {
    const res = await apiPost({
      url: `${API_ADD_REPLY}/${commentId}/reply`,
      values: { comment },
    });
    return { commentId, reply: res.reply };
  },
);

// Like a comment
export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async ({ commentId, currentUserId }: CommentActionPayload) => {
    const res = await apiPost({
      url: `${API_LIKE_COMMENT}/${commentId}/like`,
      values: {},
    });
    return {
      commentId,
      currentUserId,
      updatedComment: normalizeComment(res.comment, currentUserId),
    };
  },
);

// Dislike a comment
export const dislikeComment = createAsyncThunk(
  "comments/dislikeComment",
  async ({ commentId, currentUserId }: CommentActionPayload) => {
    const res = await apiPost({
      url: `${API_DISLIKE_COMMENT}/${commentId}/dislike`,
      values: {},
    });
    return {
      commentId,
      currentUserId,
      updatedComment: normalizeComment(res.comment, currentUserId),
    };
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<{ postId: string; comments: any[] }>) => {
          state.loading = false;
          state.comments[action.payload.postId] = action.payload.comments;
          state.error = null;
        },
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (!state.comments[action.payload.postId])
          state.comments[action.payload.postId] = [];
        state.comments[action.payload.postId].unshift(action.payload.comment);
      })
      .addCase(addReply.fulfilled, (state, action) => {
        // Find the parent comment and add reply
        for (const postId in state.comments) {
          const comment = state.comments[postId].find(
            (c) => c._id === action.payload.commentId,
          );
          if (comment) comment.replies.push(action.payload.reply);
        }
      })
      .addCase(likeComment.pending, (state, action) => {
        const { commentId } = action.meta.arg;
        const comment = findComment(state, commentId);

        if (!comment) return;

        if (comment.isLiked) {
          comment.isLiked = false;
          comment.likeCount = Math.max(0, (comment.likeCount || 0) - 1);
          return;
        }

        if (comment.isDisliked) {
          comment.isDisliked = false;
          comment.dislikeCount = Math.max(0, (comment.dislikeCount || 0) - 1);
        }

        comment.isLiked = true;
        comment.likeCount = (comment.likeCount || 0) + 1;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const { commentId, currentUserId, updatedComment } = action.payload;
        for (const postId in state.comments) {
          const index = state.comments[postId].findIndex(
            (comment) => comment._id === commentId,
          );
          if (index > -1 && updatedComment) {
            state.comments[postId][index] = mergeUpdatedComment(
              state.comments[postId][index],
              updatedComment,
              currentUserId,
            );
          }
        }
        state.error = null;
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update comment like";
      })
      .addCase(dislikeComment.pending, (state, action) => {
        const { commentId } = action.meta.arg;
        const comment = findComment(state, commentId);

        if (!comment) return;

        if (comment.isDisliked) {
          comment.isDisliked = false;
          comment.dislikeCount = Math.max(0, (comment.dislikeCount || 0) - 1);
          return;
        }

        if (comment.isLiked) {
          comment.isLiked = false;
          comment.likeCount = Math.max(0, (comment.likeCount || 0) - 1);
        }

        comment.isDisliked = true;
        comment.dislikeCount = (comment.dislikeCount || 0) + 1;
      })
      .addCase(dislikeComment.fulfilled, (state, action) => {
        const { commentId, currentUserId, updatedComment } = action.payload;
        for (const postId in state.comments) {
          const index = state.comments[postId].findIndex(
            (comment) => comment._id === commentId,
          );
          if (index > -1 && updatedComment) {
            state.comments[postId][index] = mergeUpdatedComment(
              state.comments[postId][index],
              updatedComment,
              currentUserId,
            );
          }
        }
        state.error = null;
      })
      .addCase(dislikeComment.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed to update comment dislike";
      });
  },
});

export default commentSlice.reducer;
