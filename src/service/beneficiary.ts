import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store/store";
import { AddBeneficary } from "../interfaces/service/beneficiary";
import { queryBuilder } from "../utils";
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

export const beneficiaryApi = createApi({
  reducerPath: "beneficiaryApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Beneficiary"],

  endpoints: (builder) => ({
    //addBeneficiary
    addBeneficiary: builder.mutation<any, AddBeneficary>({
      query: (body) => ({
        url: "/beneficiary",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Beneficiary", id: "Beneficiary" }],
    }),

    //beneficiary
    getAllBeneficiaries: builder.query({
      query: (params) => `/beneficiary?${queryBuilder(params)}`,
      providesTags: [{ type: "Beneficiary", id: "Beneficiary" }],
    }),

    //deleteBeneficiary
    deleteBeneficiary: builder.mutation<any, string>({
      query: (id) => ({
        url: `/beneficiary/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Beneficiary", id: "Beneficiary" }],
    }),

    //upload bulk beneficiary
    uploadBulkBeneficiary: builder.mutation<any, any>({
      query: (body) => ({
        url: "/bulk-payment/beneficiary",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Beneficiary", id: "Beneficiary" }],
    }),
  }),
});

export const {
  useAddBeneficiaryMutation,
  useGetAllBeneficiariesQuery,
  useDeleteBeneficiaryMutation,
  useUploadBulkBeneficiaryMutation,
} = beneficiaryApi;
