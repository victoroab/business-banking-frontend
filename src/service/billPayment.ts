import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store/store";
import {
  AirtimeData,
  BundleData,
  MeterDetails,
  TVDetails,
} from "../interfaces/service/billPayment";
import Cookies from "js-cookie";

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

export const billPaymentApi = createApi({
  reducerPath: "billPaymentApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Airtime", "Data", "Bundle", "TV", "Electricity"],

  endpoints: (builder) => ({
    //all airtime providers
    getAllAirtimeProviders: builder.query<any, void>({
      query: () => "/bill-payment/airtime/providers",
      providesTags: [{ type: "Airtime", id: "Airtime" }],
    }),
    //all internet providers
    getAllInternetProviders: builder.query<any, void>({
      query: () => `/bill-payment/internet/providers`,
      providesTags: [{ type: "Bundle", id: "Bundle" }],
    }),
    //all internet bundles
    getAllInternetBundles: builder.query({
      query: (categoryId) =>
        `/bill-payment/internet/bundles?serviceCategoryId=${categoryId}`,
      providesTags: [{ type: "Bundle", id: "Bundle" }],
    }),
    buyBundle: builder.mutation<any, BundleData>({
      query: (body) => ({
        url: "/bill-payment/internet/buy",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Bundle", id: "Bundle" }],
    }),

    buyAirtime: builder.mutation<any, AirtimeData>({
      query: (body) => ({
        url: "/bill-payment/airtime/buy",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Airtime", id: "Airtime" }],
    }),

    //all electricity providers
    getAllElectricityProviders: builder.query({
      query: () => `/bill-payment/electricity/providers`,
      providesTags: [{ type: "Electricity", id: "Electricity" }],
    }),

    //all cable-tv providers
    getAllCableTVProviders: builder.query({
      query: () => `/bill-payment/cable-tv/providers`,
      providesTags: [{ type: "TV", id: "TV" }],
    }),
    //all cable-tv plan
    getAllCableTVPlan: builder.query({
      query: (serviceCategory) =>
        `/bill-payment/cable-tv/plans?serviceCategoryId=${serviceCategory}`,
      providesTags: [{ type: "TV", id: "TV" }],
    }),
    validateElectricity: builder.mutation<
      any,
      { serviceCategoryId: string; cardNumber: string; vendType: string }
    >({
      query: (body) => ({
        url: "/bill-payment/electricity/validate",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Airtime", id: "Airtime" }],
    }),

    buyElectricity: builder.mutation<any, MeterDetails>({
      query: (body) => ({
        url: "/bill-payment/electricity/buy",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Airtime", id: "Airtime" }],
    }),

    validateCable: builder.mutation<
      any,
      { serviceCategoryId: string; cardNumber: string }
    >({
      query: (body) => ({
        url: "/bill-payment/cable-tv/validate",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Airtime", id: "Airtime" }],
    }),

    buyCable: builder.mutation<any, TVDetails>({
      query: (body) => ({
        url: "/bill-payment/cable-tv/buy",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Airtime", id: "Airtime" }],
    }),

    //upload bulk Airtime
    uploadBulkAirtime: builder.mutation<any, any>({
      query: (body) => ({
        url: "/bulk-payment/airtime",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Airtime", id: "Airtime" }],
    }),

    //upload bulk Data
    uploadBulkData: builder.mutation<any, any>({
      query: (body) => ({
        url: "/bulk-payment/data",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Data", id: "Data" }],
    }),
  }),
});

export const {
  useGetAllAirtimeProvidersQuery,
  useGetAllInternetProvidersQuery,
  useGetAllInternetBundlesQuery,
  useBuyAirtimeMutation,
  useBuyBundleMutation,
  useGetAllElectricityProvidersQuery,
  useGetAllCableTVPlanQuery,
  useGetAllCableTVProvidersQuery,
  useValidateElectricityMutation,
  useBuyElectricityMutation,
  useValidateCableMutation,
  useBuyCableMutation,
  useUploadBulkAirtimeMutation,
  useUploadBulkDataMutation,
} = billPaymentApi;
