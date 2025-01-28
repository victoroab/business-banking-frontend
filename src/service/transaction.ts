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
    prepareHeaders: (headers, { getState }) => {
      const userToken = (getState() as RootState)?.auth?.userInfo
        ?.refresh_token;
      console.log(userToken);
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
    window.location.href = "/";
  }
  return baseResult;
};

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Transaction"],

  endpoints: (builder) => ({
    //beneficiary
    getAllBanks: builder.query<any, void>({
      query: () => "/transaction/fetch-banks",
      providesTags: [{ type: "Transaction", id: "Transaction" }],
    }),

    //
    setPin: builder.mutation<any, { pin: string; confirmPin: string }>({
      query: (body) => ({
        url: "/transaction/set-pin",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Transaction", id: "Transaction" }],
    }),
  }),
});

export const { useGetAllBanksQuery, useSetPinMutation } = transactionApi;
