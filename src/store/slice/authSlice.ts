import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Director } from "../../interfaces/service/kyb";

interface UserInfo {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  phoneNumber: string;
  passcode: string;
  email: string;
  verificationOTP: string;
  transactionPin: string;
  kycCurrentStep: number;
  kycIdentityStep: string;
  userInfo: UserInfo | undefined;
  businessDirector: Director[];
  selectedDirector: Director | undefined;
}

const initialState: AuthState = {
  passcode: "",
  phoneNumber: "",
  email: "",
  verificationOTP: "",
  transactionPin: "",
  kycCurrentStep: 1,
  kycIdentityStep: "DEFAULT",
  userInfo: undefined,
  businessDirector: [],
  selectedDirector: undefined,
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
    setExistingVerificationOTP: (state, action) => {
      state.verificationOTP = action.payload;
    },
    setEmailAddress: (state, action) => {
      state.email = action.payload;
    },
    setKycCurrentStep: (state, action) => {
      state.kycCurrentStep = action.payload;
    },
    setKYCIdentityStep: (state, action) => {
      state.kycIdentityStep = action.payload;
    },
    setTransactionPin: (state, action) => {
      state.transactionPin = action.payload;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    addToDirector: (state, action) => {
      state.businessDirector?.push({ ...action.payload });
    },
    editDirector: (state, action) => {
      const existingDirector = state.businessDirector?.find(
        (item: Director) => item.id === action.payload.id
      );
      console.log(action.payload);
      if (existingDirector) {
        existingDirector.firstName = action.payload.firstName;
        existingDirector.lastName = action.payload.lastName;
        existingDirector.idNo = action.payload.idNo;
        existingDirector.idType = action.payload.idType;
        existingDirector.email = action.payload.email;
        existingDirector.phone = action.payload.phone;
        existingDirector.idCard = action.payload.idCard;
      }
    },

    removeDirector: (state, action) => {
      state.businessDirector = state.businessDirector?.filter(
        (item) => item.id !== action.payload
      );
    },

    setSelectedDirector: (state, action) => {
      state.selectedDirector = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setEmailAddress,
  setPasscode,
  setTransactionPin,
  setExistingVerificationOTP,
  saveUserInfo,
  setKycCurrentStep,
  setKYCIdentityStep,
  addToDirector,
  editDirector,
  removeDirector,
  setSelectedDirector,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
