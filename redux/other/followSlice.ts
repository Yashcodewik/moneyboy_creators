
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FollowCounts {
  followerCount: number;
  followingCount: number;
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
  },
  lastUpdated: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowCounts: (state, action: PayloadAction<FollowCounts>) => {
      state.counts = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    updateFollowerCount: (state, action: PayloadAction<number>) => {
      state.counts.followerCount = Math.max(0, state.counts.followerCount + action.payload);
      state.lastUpdated = new Date().toISOString();
    },
    updateFollowingCount: (state, action: PayloadAction<number>) => {
      state.counts.followingCount = Math.max(0, state.counts.followingCount + action.payload);
      state.lastUpdated = new Date().toISOString();
    },
    setFollowLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetFollowCounts: (state) => {
      state.counts = initialState.counts;
      state.lastUpdated = null;
    },
  },
});

export const {
  setFollowCounts,
  updateFollowerCount,
  updateFollowingCount,
  setFollowLoading,
  resetFollowCounts,
} = followSlice.actions;

export default followSlice.reducer;