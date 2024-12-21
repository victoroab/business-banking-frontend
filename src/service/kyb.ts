import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: BASE_URL,
    //config
    prepareHeaders: (headers, { getState }) => {
      const userToken = (getState() as RootState)?.auth?.userInfo?.access_token;
      if (userToken) {
        headers.set("Authorization", `Bearer ${userToken}`);
      }

      return headers;
    },
  })(args, api, extraOptions);

  const newResponse: any = {
    ...baseResult,
  };

  const errorCode = newResponse?.error?.status;

  if (errorCode === 401) {
    localStorage.clear();
    window.location.href = "/signin";
  }
  return baseResult;
};

export const kybApi = createApi({
  reducerPath: "kybApi",
  baseQuery: customBaseQuery,

  tagTypes: ["KYB", "Account"],

  endpoints: (builder) => ({
    //set-transaction-pin
    setTransactionPin: builder.mutation<
      any,
      { pin: string; confirmPin: string; phoneNumber: string }
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
