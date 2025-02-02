import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  billCategory: string;
  posSelectedCategory: string;
}

const initialState: DashboardState = {
  billCategory: "",
  posSelectedCategory: "",
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
  },
});

export const { setBillCategoryAction, setPosSelectedCategory } =
  dashboardSlice.actions;

export const selectDashboard = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
