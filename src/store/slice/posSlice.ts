import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { POSPayload } from "../../interfaces/service/pos";

interface PosState {
  requestPOSPayload: POSPayload;
  posCurrentStep: number;
}

const initialState: PosState = {
  requestPOSPayload: {
    businessId: "",
    deviceType: "",
    merchantName: "",
    deliveryOption: "",
    pickupBranch: "",
    address: "",
    city: "",
    zipCode: "",
    pin: "",
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
