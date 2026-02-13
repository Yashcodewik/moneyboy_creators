import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  subscriptions: any[];
  subscribers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  subscribers: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSubscriptions(state, action: PayloadAction<any[]>) {
      state.subscriptions = action.payload;
    },
    setSubscribers(state, action: PayloadAction<any[]>) {
      state.subscribers = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearSubscriptionState() {
      return initialState;
    },
    cancelSubscriptionSuccess(state, action: PayloadAction<string>) {
      const subscriptionId = action.payload;

      const target = state.subscriptions.find(
        (item) => item._id === subscriptionId
      );

      if (target) {
        target.isActive = false;
        target.expiresAt = new Date().toISOString();
      }
    },
  },
});

export const {
  setLoading,
  setSubscriptions,
  setSubscribers,
  setError,
  clearSubscriptionState,
  cancelSubscriptionSuccess,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
