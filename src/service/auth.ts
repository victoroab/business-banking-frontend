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
    initiate: builder.mutation<any, { phoneNumber: string }>({
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

    //set-passcode
    setPasscode: builder.mutation<
      any,
      { passcode: string; confirmPasscode: string }
    >({
      query: (body) => ({
        url: "/auth/signup/set-passcode",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "Auth" }],
    }),

    //set-transaction^pin
    setTransactionPin: builder.mutation<
      any,
      { pin: string; confirmPin: string }
    >({
      query: (body) => ({
        url: "/auth/signup/set-pin",
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
  useSetPasscodeMutation,
  useSetTransactionPinMutation,
} = authApi;
