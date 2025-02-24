import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AccountState {
  accountDetails: any;
  businessKYBDetails: any;
}

const initialState: AccountState = {
  accountDetails: undefined,
  businessKYBDetails: undefined,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,

  reducers: {
    setAccountDetails: (state, action) => {
      state.accountDetails = action.payload;
    },
    setBusinessKYBDetials: (state, action) => {
      state.businessKYBDetails = action.payload;
    },
  },
});

export const { setAccountDetails, setBusinessKYBDetials } =
  accountSlice.actions;

export const selectAccount = (state: RootState) => state.account;
export default accountSlice.reducer;
