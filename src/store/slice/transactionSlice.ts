import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TransactionPayload } from "../../interfaces/service/transaction";

interface TransactionState {
  sendMoneyPayload: TransactionPayload;
  transactionCurrentStep: number;
}

const initialState: TransactionState = {
  sendMoneyPayload: {
    fromAccountNumber: "",
    amount: 0,
    bankCode: "",
    accountNumber: "",
    narration: "",
    pin: "",
    accountName: "",
    bankName: "",
  },
  transactionCurrentStep: 1,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,

  reducers: {
    setSendMoneyPayload: (state, action) => {
      state.sendMoneyPayload = {
        ...state.sendMoneyPayload,
        ...action.payload,
      };
    },
    setTransactionCurrentStep: (state, action) => {
      state.transactionCurrentStep = action.payload;
    },
  },
});

export const { setSendMoneyPayload, setTransactionCurrentStep } =
  transactionSlice.actions;

export const selectTransaction = (state: RootState) => state.transaction;
export default transactionSlice.reducer;
