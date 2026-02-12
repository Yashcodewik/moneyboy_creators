import { createSlice } from "@reduxjs/toolkit";
import { unlockPost, subscribeCreator, sendTip } from "./Action";

/* ---------- State ---------- */
interface SubscriptionState {
  unlocking: boolean;
  subscribing: boolean;
  tipping: boolean; // ✅ Added
  error: string | null;
}

const initialState: SubscriptionState = {
  unlocking: false,
  subscribing: false,
  tipping: false, // ✅ Added
  error: null,
};

/* ---------- Slice ---------- */
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    resetSubscriptionState: () => initialState,
  },
  extraReducers: (builder) => {
    /* ---------- Unlock Post ---------- */
    builder
      .addCase(unlockPost.pending, (state) => {
        state.unlocking = true;
        state.error = null;
      })
      .addCase(unlockPost.fulfilled, (state) => {
        state.unlocking = false;
      })
      .addCase(unlockPost.rejected, (state, action) => {
        state.unlocking = false;
        state.error = action.payload as string;
      });

    /* ---------- Subscribe Creator ---------- */
    builder
      .addCase(subscribeCreator.pending, (state) => {
        state.subscribing = true;
        state.error = null;
      })
      .addCase(subscribeCreator.fulfilled, (state) => {
        state.subscribing = false;
      })
      .addCase(subscribeCreator.rejected, (state, action) => {
        state.subscribing = false;
        state.error = action.payload as string;
      });

    /* ---------- Send Tip ---------- */
    builder
      .addCase(sendTip.pending, (state) => {
        state.tipping = true;
        state.error = null;
      })
      .addCase(sendTip.fulfilled, (state) => {
        state.tipping = false;
      })
      .addCase(sendTip.rejected, (state, action) => {
        state.tipping = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubscriptionState } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
