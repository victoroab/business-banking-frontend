import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  airtimeDataAction: string;
  billCategory: string;
  posSelectedCategory: string;
}

const initialState: DashboardState = {
  airtimeDataAction: "",
  billCategory: "",
  posSelectedCategory: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    setAirtimeDataAction: (state, action) => {
      state.airtimeDataAction = action.payload;
    },
    setBillCategoryAction: (state, action) => {
      state.billCategory = action.payload;
    },
    setPosSelectedCategory: (state, action) => {
      state.posSelectedCategory = action.payload;
    },
  },
});

export const {
  setAirtimeDataAction,
  setBillCategoryAction,
  setPosSelectedCategory,
} = dashboardSlice.actions;

export const selectDashboard = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
