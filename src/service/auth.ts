import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ["Auth", "KYB", "Account"],

  endpoints: (builder) => ({
    //initiate
    initiate: builder.mutation<
      any,
      { phoneNumber: string; onboardType: string }
    >({
      query: (body) => ({
        url: "/auth/signup/initiate",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //verify-phone
    verfifyPhone: builder.mutation<any, { phoneNumber: string; otp: string }>({
      query: (body) => ({
        url: "/auth/signup/verify-phone",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //verify-existing-account
    verfifyExistingAccount: builder.mutation<
      any,
      { accountNumber: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/signup/verify-existing",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //set-email
    setEmail: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/signup/set-email",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //verify-phone
    verfifyEmail: builder.mutation<
      any,
      { phoneNumber: string; otp: string; email: string }
    >({
      query: (body) => ({
        url: "/auth/signup/verify-email",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //set-passcode
    setPasscode: builder.mutation<
      any,
      { passcode: string; confirmPasscode: string; phoneNumber: string }
    >({
      query: (body) => ({
        url: "/auth/signup/set-passcode",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),
    //set-existing-passcode
    setExistingPasscode: builder.mutation<
      any,
      {
        passcode: string;
        confirmPasscode: string;
        accountNumber: string;
        otp: string;
      }
    >({
      query: (body) => ({
        url: "/auth/signup/set-existing-passcode",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //signin
    signIn: builder.mutation<any, { phoneNumber: string; passcode: string }>({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //signin-verify
    signInVerify: builder.mutation<
      any,
      { phoneNumber: string; otp: string; passcode: string }
    >({
      query: (body) => ({
        url: "/auth/signin/verify-otp",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //request resset code
    requestResetCode: builder.mutation<any, { emailOrAccountNumber: string }>({
      query: (body) => ({
        url: "/auth/passcode/reset/request",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //verify resset code
    verifyResetCode: builder.mutation<
      any,
      { emailOrAccountNumber: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/passcode/reset/verify",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),
    //set new code
    setCode: builder.mutation<
      any,
      {
        emailOrAccountNumber: string;
        otp: string;
        passcode: string;
        confirmPasscode: string;
      }
    >({
      query: (body) => ({
        url: "/auth/passcode/reset",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),
  }),
});

export const {
  useInitiateMutation,
  useVerfifyPhoneMutation,
  useSetEmailMutation,
  useVerfifyEmailMutation,
  useSetPasscodeMutation,
  useVerfifyExistingAccountMutation,
  useSetExistingPasscodeMutation,
  useSignInMutation,
  useSignInVerifyMutation,
  useRequestResetCodeMutation,
  useVerifyResetCodeMutation,
  useSetCodeMutation,
} = authApi;
