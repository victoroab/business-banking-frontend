import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserInfo {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  phoneNumber: string;
  passcode: string;
  email: string;
  transactionPin: string;
  kycCurrentStep: number;
  userInfo: UserInfo | undefined;
}

const initialState: AuthState = {
  passcode: "",
  phoneNumber: "",
  email: "",
  transactionPin: "",
  kycCurrentStep: 1,
  userInfo: undefined,
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
    setEmailAddress: (state, action) => {
      state.email = action.payload;
    },
    setKycCurrentStep: (state, action) => {
      state.kycCurrentStep = action.payload;
      console.log(state.kycCurrentStep);
    },
    setTransactionPin: (state, action) => {
      state.transactionPin = action.payload;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setEmailAddress,
  setPasscode,
  setTransactionPin,
  saveUserInfo,
  setKycCurrentStep,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
