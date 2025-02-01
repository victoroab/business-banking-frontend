import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { POSPayload } from "../../interfaces/service/pos";

interface PosState {
  requestPOSPayload: POSPayload;
  posCurrentStep: number;
}

const initialState: PosState = {
  requestPOSPayload: {
    businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    deviceType: "ANDROID",
    merchantName: "ABC Store",
    deliveryOption: "PICKUP",
    cardType: "VERVE",
    pickupBranch: "YABA",
    address: "123 Main Street",
    city: "Lagos",
    zipCode: "100001",
    pin: "1234",
  },
  posCurrentStep: 1,
};

export const posSlice = createSlice({
  name: "pos",
  initialState,

  reducers: {
    setResquestPOS: (state, action) => {
      state.requestPOSPayload = {
        ...state.requestPOSPayload,
        ...action.payload,
      };
    },
    setPosCurrentStep: (state, action) => {
      state.posCurrentStep = action.payload;
    },
  },
});

export const { setResquestPOS, setPosCurrentStep } = posSlice.actions;

export const selectPOS = (state: RootState) => state.pos;
export default posSlice.reducer;
