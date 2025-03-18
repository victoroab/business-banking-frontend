import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { TransactionPayload } from "../interfaces/service/transaction";
import Cookies from "js-cookie";

const queryBuilder = (params: { [key: string]: string }) => {
  if (!params || Object.keys(params).length === 0) return "";
  const filteredParams = Object.entries(params)
    .filter(
      ([_, value]) => value !== null && value != undefined && value !== ""
    )
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

  return new URLSearchParams(filteredParams).toString();
};

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (
      headers
      // { getState }
    ) => {
      // const userToken = (getState() as RootState)?.auth?.userInfo
      //   ?.refresh_token;
      const userToken = Cookies.get("businessUserToken");
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
    window.location.href = "/welcome";
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
    //beneficiary
    getAllTransactions: builder.query({
      query: (params) => `/transaction?${queryBuilder(params)}`,
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

    // name-enquiry

    nameEnquiry: builder.mutation<
      any,
      { accountNumber: string; bankCode: string }
    >({
      query: (body) => ({
        url: "/transaction/name-enquiry",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Transaction", id: "Transaction" }],
    }),

    //send-money

    sendMoney: builder.mutation<any, TransactionPayload>({
      query: (body) => ({
        url: "/transaction/send-money",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Transaction", id: "Transaction" }],
    }),
    //logo
    getAllLogos: builder.query<any, void>({
      query: () => `/logos`,
      providesTags: [{ type: "Transaction", id: "Transaction" }],
    }),
    //upload bulk Transaction
    uploadBulkTransaction: builder.mutation<any, any>({
      query: (body) => ({
        url: "/bulk-payment/transfer",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Transaction", id: "Transaction" }],
    }),

    //upload bulk Pension
    uploadBulkPension: builder.mutation<any, any>({
      query: (body) => ({
        url: "/bulk-payment/pension",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Transaction", id: "Transaction" }],
    }),

    //notification
    getAllNotification: builder.query<any, any>({
      query: (params) => `/notification?${queryBuilder(params)}`,
      providesTags: [{ type: "Transaction", id: "Transaction" }],
    }),
  }),
});
export const {
  useGetAllBanksQuery,
  useGetAllTransactionsQuery,
  useSetPinMutation,
  useNameEnquiryMutation,
  useSendMoneyMutation,
  useGetAllLogosQuery,
  useUploadBulkTransactionMutation,
  useUploadBulkPensionMutation,
  useGetAllNotificationQuery,
} = transactionApi;
