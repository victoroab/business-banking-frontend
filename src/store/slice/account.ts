import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AccountState {
  accountDetails: any;
}

const initialState: AccountState = {
  accountDetails: undefined,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,

  reducers: {
    setAccountDetails: (state, action) => {
      state.accountDetails = action.payload;
    },
  },
});

export const { setAccountDetails } = accountSlice.actions;

export const selectAccount = (state: RootState) => state.account;
export default accountSlice.reducer;
