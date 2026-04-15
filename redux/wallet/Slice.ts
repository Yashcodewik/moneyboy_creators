import { createSlice } from "@reduxjs/toolkit";
import { fetchWallet, addWalletFunds, fetchTransactions } from "./Action";

interface WalletState {
  balance: number;

  transactions: any[];
  summary: any;

  loading: boolean;
  transactionLoading: boolean;

  addingFunds: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,

  transactions: [],
  summary: null,

  loading: false,
  transactionLoading: false,

  addingFunds: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    deductBalance: (state, action) => {
      const amount = action.payload;

      // update balance
      state.balance -= amount;

      // update summary also
      if (state.summary) {
        state.summary.walletBalance -= amount;
      }
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },

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

    /* ---------- Fetch Transactions ---------- */
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.transactionLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactionLoading = false;

        const newTransactions = action.payload?.data || [];

        const isSame =
          state.transactions.length === newTransactions.length &&
          state.transactions[0]?._id === newTransactions[0]?._id;

        if (!isSame) {
          state.transactions = newTransactions;
        }

        state.summary = action.payload?.summary || null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.transactionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { deductBalance, clearTransactions } = walletSlice.actions;

export default walletSlice.reducer;
