import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AirtimeBundleData } from "../../interfaces/service/billPayment";

interface TransactionState {
  airtimeDataAction: string;
  airtimeBundlePayload: AirtimeBundleData;
  airtimeDataCurrentStep: number;
  billpaymentCurrentStep: number;
  billPaymentPayload: any;
  selectedElectricityProvider: any | undefined;
  cableProvider: string;
  cablePackage: any | undefined;
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
    serviceCategoryId: "",
    meterType: "",
    meterNumber: "",
    meterName: "",
    vendType: "",
    pin: "",
    amount: 0,
    cardNumber: "",
    bundleCode: "",
    provider: "",
    name: "",
    invoicePeriod: "",
  },

  airtimeDataCurrentStep: 1,
  billpaymentCurrentStep: 1,
  selectedElectricityProvider: undefined,
  cableProvider: "",
  cablePackage: undefined,
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

    setSelectedElectricityProvider: (state, action) => {
      state.selectedElectricityProvider = action.payload;
    },
    setSelectedCableProvider: (state, action) => {
      state.cableProvider = action.payload;
    },

    setSelectedCablePackage: (state, action) => {
      state.cablePackage = action.payload;
    },
  },
});

export const {
  setAirtimeDataAction,
  setAirtimeBundlePayload,
  setAirtimeDataCurrentStep,
  setBillpaymentCurrentStep,
  setBillPaymentPayload,
  setSelectedElectricityProvider,
  setSelectedCableProvider,
  setSelectedCablePackage,
} = billPaymentSlice.actions;

export const selectBillPayment = (state: RootState) => state.billPayment;
export default billPaymentSlice.reducer;
