import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  likePostAction,
  dislikePostAction,
  removeReactionAction,
  addPostViewAction,
  toggleFavoriteAction,
  reportPostAction
} from "./feedAction";

export type ReactionType = "LIKE" | "DISLIKE" | null;

interface FeedReactionState {
  loading: Record<string, boolean>; // postId -> loading
  viewLoading: Record<string, boolean>; 
  viewed: Record<string, boolean>;
  reported: Record<string, boolean>;
}

const initialState: FeedReactionState = {
  loading: {},
  viewLoading: {},
  viewed: {},
  reported: {},
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
          console.log("⏳ View pending:", action.meta.arg);
      const publicId = action.meta.arg;
      state.viewLoading[publicId] = true;
    })
    .addCase(addPostViewAction.fulfilled, (state, action) => {
        console.log("✅ View fulfilled:", action.payload.publicId);
      const { publicId } = action.payload;
      delete state.viewLoading[publicId];
      state.viewed[publicId] = true;
    })
    .addCase(addPostViewAction.rejected, (state, action) => {
      const publicId = action.meta.arg;
      delete state.viewLoading[publicId];
    })
    .addCase(toggleFavoriteAction.pending, (state, action) => {
      state.loading[action.meta.arg] = true;
    })
    .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
      const { postId } = action.payload;
      delete state.loading[postId];
    })
    .addCase(toggleFavoriteAction.rejected, (state, action) => {
      delete state.loading[action.meta.arg];
    })
    .addCase(reportPostAction.pending, (state, action) => {
      state.loading[action.meta.arg.postId] = true;
    })

    .addCase(reportPostAction.fulfilled, (state, action) => {
      const { postId } = action.payload;
      delete state.loading[postId];
      state.reported[postId] = true; 
    })

    .addCase(reportPostAction.rejected, (state, action) => {
      delete state.loading[action.meta.arg.postId];
    });

  },
});

export const {
  setReactionLoading,
  clearReactionLoading,
} = feedSlice.actions;

export default feedSlice.reducer;
