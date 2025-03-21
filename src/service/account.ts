import Cookies from "js-cookie";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store/store";

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

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Account", "Security"],

  endpoints: (builder) => ({
    //account details
    getAccountDetails: builder.query({
      query: () => "/account",
      providesTags: [{ type: "Account", id: "Account" }],
    }),

    //account details
    getAccounts: builder.mutation<any, void>({
      query: () => ({
        url: "/account",
      }),
      invalidatesTags: [{ type: "Account", id: "Account" }],
    }),

    submitSecurityQuestions: builder.mutation<
      any,
      {
        securityQuestions: Array<{
          number: number;
          question: string;
          answer: string;
        }>;
      }
    >({
      query: (body) => ({
        url: "/security/question",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Security", id: "Security" }],
    }),

    //account enq
    getAccountEnquiry: builder.query({
      query: () => "/account/balance-enquiry",
      providesTags: [{ type: "Account", id: "Account" }],
    }),
    //business
    getAllBusinesses: builder.query({
      query: () => "/business",
      providesTags: [{ type: "Account", id: "Account" }],
    }),
  }),
});

export const {
  useGetAccountDetailsQuery,
  useGetAccountsMutation,
  useSubmitSecurityQuestionsMutation,
  useGetAccountEnquiryQuery,
  useGetAllBusinessesQuery,
} = accountApi;
