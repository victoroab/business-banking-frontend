import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GlobalState {
  accountStatus: string;
  searchQuery: string;
  havePersonalAccount: boolean;
  [key: string]: boolean | number | string;
}

const initialState: GlobalState = {
  accountStatus: "",
  billCategory: "",
  searchQuery: "",
  havePersonalAccount: false,
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
    resetAllShows: (state) => {
      Object.keys(state).forEach((key) => {
        if (typeof state[key] === "boolean") {
          state[key] = false;
        }
      });
    },
    saveAccountStatus: (state, action) => {
      state.accountStatus = action.payload;
    },
    saveBillCategory: (state, action) => {
      state.billCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    saveElectricityProvider: (state, action) => {
      state.selectedElectricityProvider = action.payload;
    },
    setHavePersonalAccount: (state, action) => {
      state.havePersonalAccount = action.payload;
    },
  },
});

export const {
  toggleShow,
  // resetAllShows,
  setSearchQuery,
  saveAccountStatus,
  saveBillCategory,
  saveElectricityProvider,
  setHavePersonalAccount,
} = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;
export default globalSlice.reducer;
