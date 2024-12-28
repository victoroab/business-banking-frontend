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

    //set-email
    setEmail: builder.mutation<any, { phoneNumber: string; email: string }>({
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
  }),
});

export const {
  useInitiateMutation,
  useVerfifyPhoneMutation,
  useSetEmailMutation,
  useVerfifyEmailMutation,
  useSetPasscodeMutation,
} = authApi;
