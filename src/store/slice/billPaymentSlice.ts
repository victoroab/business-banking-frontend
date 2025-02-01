import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AirtimeBundleData } from "../../interfaces/service/billPayment";

interface TransactionState {
  airtimeDataAction: string;
  airtimeBundlePayload: AirtimeBundleData;
  airtimeDataCurrentStep: number;
}

const initialState: TransactionState = {
  airtimeDataAction: "",
  airtimeBundlePayload: {
    fromAccountNumber: "",
    pin: "",
    serviceCategoryId: "",
    network: "",
    phoneNumber: "",
    bundleCode: "",
    amount: 0,
  },
  airtimeDataCurrentStep: 1,
};

export const billPaymentSlice = createSlice({
  name: "billPayment",
  initialState,

  reducers: {
    setAirtimeDataAction: (state, action) => {
      state.airtimeDataAction = action.payload;
    },

    setAirtimeBundlePayload: (state, action) => {
      state.airtimeBundlePayload = {
        ...state.airtimeBundlePayload,
        ...action.payload,
      };
    },

    setAirtimeDataCurrentStep: (state, action) => {
      state.airtimeDataCurrentStep = action.payload;
    },
  },
});

export const {
  setAirtimeDataAction,
  setAirtimeBundlePayload,
  setAirtimeDataCurrentStep,
} = billPaymentSlice.actions;

export const selectBillPayment = (state: RootState) => state.billPayment;
export default billPaymentSlice.reducer;
