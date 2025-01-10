import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  airtimeDataAction: string;
}

const initialState: DashboardState = {
  airtimeDataAction: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    setAirtimeDataAction: (state, action) => {
      state.airtimeDataAction = action.payload;
    },
  },
});

export const { setAirtimeDataAction } = dashboardSlice.actions;

export const selectDashboard = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
