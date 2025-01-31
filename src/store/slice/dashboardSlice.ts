import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  billCategory: string;
  posSelectedCategory: string;
  activeUploadTab: number;
}

const initialState: DashboardState = {
  billCategory: "",
  posSelectedCategory: "",
  activeUploadTab: 1,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    setBillCategoryAction: (state, action) => {
      state.billCategory = action.payload;
    },
    setPosSelectedCategory: (state, action) => {
      state.posSelectedCategory = action.payload;
    },
    setActiveUploadTab: (state, action) => {
      state.activeUploadTab = action.payload;
    },
  },
});

export const {
  setBillCategoryAction,
  setPosSelectedCategory,
  setActiveUploadTab,
} = dashboardSlice.actions;

export const selectDashboard = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
