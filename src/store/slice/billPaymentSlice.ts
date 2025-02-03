import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AirtimeBundleData } from "../../interfaces/service/billPayment";

interface TransactionState {
  airtimeDataAction: string;
  airtimeBundlePayload: AirtimeBundleData;
  airtimeDataCurrentStep: number;
  billpaymentCurrentStep: number;
  billPaymentPayload: any;
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

  billPaymentPayload: {
    fromAccountNumber: "",
    pin: "",
    serviceCategoryId: "",
    network: "",
    phoneNumber: "",
    bundleCode: "",
    amount: 0,
  },

  airtimeDataCurrentStep: 1,
  billpaymentCurrentStep: 1,
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
    setBillpaymentCurrentStep: (state, action) => {
      state.billpaymentCurrentStep = action.payload;
    },

    setBillPaymentPayload: (state, action) => {
      state.billPaymentPayload = {
        ...state.billPaymentPayload,
        ...action.payload,
      };
    },
  },
});

export const {
  setAirtimeDataAction,
  setAirtimeBundlePayload,
  setAirtimeDataCurrentStep,
  setBillpaymentCurrentStep,
} = billPaymentSlice.actions;

export const selectBillPayment = (state: RootState) => state.billPayment;
export default billPaymentSlice.reducer;
