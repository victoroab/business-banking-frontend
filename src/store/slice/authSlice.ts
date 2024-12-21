import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  phoneNumber: string;
  passcode: string;
  transactionPin: string;
  havePersonalAccount: boolean;
}

const initialState: AuthState = {
  passcode: "",
  phoneNumber: "",
  transactionPin: "",
  havePersonalAccount: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setPasscode: (state, action) => {
      state.passcode = action.payload;
    },
    setHavePersonalAccount: (state, action) => {
      state.havePersonalAccount = action.payload;
    },
    setTransactionPin: (state, action) => {
      state.transactionPin = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setPasscode,
  setHavePersonalAccount,
  setTransactionPin,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
