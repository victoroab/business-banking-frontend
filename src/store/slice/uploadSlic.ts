import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  activeUploadTab: number;
  uploadCurrentStep: number;
  uploadPayload: {
    fromAccountNumber: string;
    paymentMode: string;
    paymentDate: string;
    beneficiaryType: string;
    employerCode: string;
    email: string;
    month: string;
    year: string;
  };
}

const initialState: DashboardState = {
  activeUploadTab: 1,
  uploadCurrentStep: 1,
  uploadPayload: {
    fromAccountNumber: "",
    paymentMode: "",
    paymentDate: "",
    beneficiaryType: "",
    employerCode: "",
    email: "",
    month: "",
    year: "",
  },
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,

  reducers: {
    setActiveUploadTab: (state, action) => {
      state.activeUploadTab = action.payload;
    },

    setUploadCurrentStep: (state, action) => {
      state.uploadCurrentStep = action.payload;
    },
    setUploadPayload: (state, action) => {
      state.uploadPayload = {
        ...state.uploadPayload,
        ...action.payload,
      };
    },
  },
});

export const { setActiveUploadTab, setUploadCurrentStep, setUploadPayload } =
  uploadSlice.actions;

export const selectUpload = (state: RootState) => state.upload;
export default uploadSlice.reducer;
