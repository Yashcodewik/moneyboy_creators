import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FollowCounts {
  followerCount: number;
  followingCount: number;
  postCount: number;
}

interface FollowState {
  loading: boolean;
  counts: FollowCounts;
  lastUpdated: string | null;
}

const initialState: FollowState = {
  loading: false,
  counts: {
    followerCount: 0,
    followingCount: 0,
     postCount: 0,
  },
  lastUpdated: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowCounts: (state, action: PayloadAction<FollowCounts>) => {
      state.counts = {
  followerCount: action.payload.followerCount || 0,
  followingCount: action.payload.followingCount || 0,
  postCount: action.payload.postCount || 0, // ✅ ADD
};
      state.lastUpdated = new Date().toISOString();
    },
    updateFollowerCount: (state, action: PayloadAction<number>) => {
      state.counts.followerCount = Math.max(
        0,
        state.counts.followerCount + action.payload,
      );
      state.lastUpdated = new Date().toISOString();
    },
    updateFollowingCount: (state, action: PayloadAction<number>) => {
      state.counts.followingCount = Math.max(
        0,
        state.counts.followingCount + action.payload,
      );
      state.lastUpdated = new Date().toISOString();
    },
    setFollowLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetFollowCounts: (state) => {
      state.counts = initialState.counts;
      state.lastUpdated = null;
    },
    updatePostCount: (state, action: PayloadAction<number>) => {
  state.counts.postCount = Math.max(
    0,
    state.counts.postCount + action.payload
  );
  state.lastUpdated = new Date().toISOString();
},
  },
});

export const {
  setFollowCounts,
  updateFollowerCount,
  updateFollowingCount,
  setFollowLoading,
  resetFollowCounts,
  updatePostCount,
} = followSlice.actions;

export default followSlice.reducer;
