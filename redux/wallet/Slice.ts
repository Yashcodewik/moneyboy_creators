import { createSlice } from "@reduxjs/toolkit";
import { fetchWallet, addWalletFunds } from "./Action";

interface WalletState {
  balance: number;
  loading: boolean;
  addingFunds: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,
  loading: false,
  addingFunds: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /* ---------- Fetch Wallet ---------- */
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload?.balance || 0;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ---------- Add Funds ---------- */
    builder
      .addCase(addWalletFunds.pending, (state) => {
        state.addingFunds = true;
        state.error = null;
      })
      .addCase(addWalletFunds.fulfilled, (state, action) => {
        state.addingFunds = false;
        state.balance = action.payload?.balance || state.balance;
      })
      .addCase(addWalletFunds.rejected, (state, action) => {
        state.addingFunds = false;
        state.error = action.payload as string;
      });
  },
});

export default walletSlice.reducer;