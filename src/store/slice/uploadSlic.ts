import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  activeUploadTab: number;
  uploadCurrentStep: number;
}

const initialState: DashboardState = {
  activeUploadTab: 1,
  uploadCurrentStep: 1,
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
  },
});

export const { setActiveUploadTab, setUploadCurrentStep } = uploadSlice.actions;

export const selectUpload = (state: RootState) => state.upload;
export default uploadSlice.reducer;
