import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserInfo {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  phoneNumber: string;
  passcode: string;
  transactionPin: string;
  userInfo: UserInfo | undefined;
}

const initialState: AuthState = {
  passcode: "",
  phoneNumber: "",
  transactionPin: "",
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
    setTransactionPin: (state, action) => {
      state.transactionPin = action.payload;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setPhoneNumber, setPasscode, setTransactionPin, saveUserInfo } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
