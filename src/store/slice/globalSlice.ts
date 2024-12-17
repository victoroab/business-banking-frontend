import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GlobalState {
  accountStatus: string;
  [key: string]: boolean | number | string;
}

const initialState: GlobalState = {
  accountStatus: "",
  billCategory: "",
  selectedElectricityProvider: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    toggleShow: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      return {
        ...state,
        [id]: !state[id],
      };
    },
    saveAccountStatus: (state, action) => {
      state.accountStatus = action.payload;
    },
    saveBillCategory: (state, action) => {
      state.billCategory = action.payload;
    },
    saveElectricityProvider: (state, action) => {
      state.selectedElectricityProvider = action.payload;
    },
  },
});

export const {
  toggleShow,
  saveAccountStatus,
  saveBillCategory,
  saveElectricityProvider,
} = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;
export default globalSlice.reducer;
