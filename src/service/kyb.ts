import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const kybApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ["KYB", "Account"],

  endpoints: (builder) => ({
    //set-transaction-pin
    setTransactionPin: builder.mutation<
      any,
      { pin: string; confirmPin: string }
    >({
      query: (body) => ({
        url: "/auth/signup/set-pin",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),
  }),
});

export const { useSetTransactionPinMutation } = kybApi;
