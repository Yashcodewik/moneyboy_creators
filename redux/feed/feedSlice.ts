import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  likePostAction,
  dislikePostAction,
  removeReactionAction,
  addPostViewAction
} from "./feedAction";

export type ReactionType = "LIKE" | "DISLIKE" | null;

interface FeedReactionState {
  loading: Record<string, boolean>; // postId -> loading
  viewLoading: Record<string, boolean>; 
  viewed: Record<string, boolean>;
}

const initialState: FeedReactionState = {
  loading: {},
  viewLoading: {},
  viewed: {},
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setReactionLoading: (
      state,
      action: PayloadAction<{ postId: string; loading: boolean }>
    ) => {
      state.loading[action.payload.postId] = action.payload.loading;
    },
    clearReactionLoading: (state, action: PayloadAction<string>) => {
      delete state.loading[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likePostAction.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
      })
      .addCase(dislikePostAction.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
      })
      .addCase(removeReactionAction.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
      })

      .addCase(likePostAction.fulfilled, (state, action) => {
        delete state.loading[action.payload.postId];
      })
      .addCase(dislikePostAction.fulfilled, (state, action) => {
        delete state.loading[action.payload.postId];
      })
      .addCase(removeReactionAction.fulfilled, (state, action) => {
        delete state.loading[action.payload.postId];
      })

      .addCase(likePostAction.rejected, (state, action) => {
        delete state.loading[action.meta.arg];
      })
      .addCase(dislikePostAction.rejected, (state, action) => {
        delete state.loading[action.meta.arg];
      })
      .addCase(removeReactionAction.rejected, (state, action) => {
        delete state.loading[action.meta.arg];
      })
    .addCase(addPostViewAction.pending, (state, action) => {
  const publicId = action.meta.arg;
  state.viewLoading[publicId] = true;
})
.addCase(addPostViewAction.fulfilled, (state, action) => {
  const { publicId } = action.payload;
  delete state.viewLoading[publicId];
  state.viewed[publicId] = true;
})
.addCase(addPostViewAction.rejected, (state, action) => {
  const publicId = action.meta.arg;
  delete state.viewLoading[publicId];
});


      
  },
});

export const {
  setReactionLoading,
  clearReactionLoading,
} = feedSlice.actions;

export default feedSlice.reducer;
