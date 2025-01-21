import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import {
  AddressProps,
  BusinessDocument,
  BusinessInfo,
} from "../interfaces/service/kyb";
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

      if (userToken) {
        headers.set("Authorization", `Bearer ${userToken}`);
      }

      return headers;
    },
  })(args, api, extraOptions);

  // const newResponse: any = {
  //   ...baseResult,
  // };

  // const errorCode = newResponse?.error?.status;

  // if (errorCode === 401) {
  //   localStorage.clear();
  //   window.location.href = "/";
  // }
  return baseResult;
};

export const kybApi = createApi({
  reducerPath: "kybApi",
  baseQuery: customBaseQuery,

  tagTypes: ["KYB", "Auth", "Account"],

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
    //set-country
    setNationality: builder.mutation<any, { country: string }>({
      query: (body) => ({
        url: "/kyb/nationality",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //set-name-dob
    setName: builder.mutation<
      any,
      {
        firstName: string;
        lastName: string;
        otherName: string;
        dob: string;
        phoneNumber: string;
      }
    >({
      query: (body) => ({
        url: "auth/signup/set-name-dob",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Auth", id: "KYB" }],
    }),
    //verify-btn
    verifyBVN: builder.mutation<any, { bvn: string }>({
      query: (body) => ({
        url: "/kyb/verify-bvn",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //verify-nin
    verifyNIN: builder.mutation<any, { nin: string }>({
      query: (body) => ({
        url: "/kyb/verify-nin",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //validate-btn
    validateBVN: builder.mutation<any, { bvn: string }>({
      query: (body) => ({
        url: "/kyb/validate-bvn",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //verify-tin
    verifyTin: builder.mutation<any, { tin: string }>({
      query: (body) => ({
        url: "/kyb/verify-tin",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),
    //verify-btn-otp
    verifyBVNOtp: builder.mutation<any, { bvn: string }>({
      query: (body) => ({
        url: "/kyb/verify-bvn-otp",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),
    getBVNDetails: builder.query({
      query: () => "kyb/retrieve-bvn-details",
      providesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //verify-face
    verifyFace: builder.mutation<any, { image: string }>({
      query: (body) => ({
        url: "/kyb/verify-face",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //verify-business-details
    verifyBusinesDetails: builder.mutation<any, BusinessInfo>({
      query: (body) => ({
        url: "/kyb/verify-business-details",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //verify-residential-addresss
    verifyResidentialAddress: builder.mutation<any, AddressProps>({
      query: (body) => ({
        url: "/kyb/verify-residential-address",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),
    //verify-business-documents
    verifyBusinessDocuments: builder.mutation<any, BusinessDocument>({
      query: (body) => ({
        url: "/kyb/verify-business-documents",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //verify-business-address
    verifyBusinessAddress: builder.mutation<any, AddressProps>({
      query: (body) => ({
        url: "/kyb/verify-business-address",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),
    //attestation
    attestation: builder.mutation<any, { attest: boolean }>({
      query: (body) => ({
        url: "/kyb/attestation",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //kyb
    userProfile: builder.query({
      query: () => "/user/me",
      providesTags: [{ type: "KYB", id: "KYB" }],
    }),

    //kyb
    kybDetails: builder.query({
      query: () => "/kyb",
      providesTags: [{ type: "KYB", id: "KYB" }],
    }),
  }),
});

export const {
  useSetTransactionPinMutation,
  useSetNationalityMutation,
  useVerifyBVNMutation,
  useVerifyNINMutation,
  useSetNameMutation,
  useValidateBVNMutation,
  useVerifyResidentialAddressMutation,
  useAttestationMutation,
  useVerifyBVNOtpMutation,
  useVerifyBusinessAddressMutation,
  useVerifyBusinessDocumentsMutation,
  useVerifyFaceMutation,
  useVerifyTinMutation,
  useVerifyBusinesDetailsMutation,
  useGetBVNDetailsQuery,
  useKybDetailsQuery,
  useUserProfileQuery,
} = kybApi;
