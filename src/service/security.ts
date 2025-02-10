import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie";
import { QRCodeResponse } from "../interfaces/service/security";

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
    window.location.href = "/";
  }
  return baseResult;
};

export const securityApi = createApi({
  reducerPath: "securityApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Security"],

  endpoints: (builder) => ({
    //beneficiary
    getAllCode: builder.query<any, void>({
      query: () => "/security/2fa",
      providesTags: [{ type: "Security", id: "Security" }],
    }),

    generateCode: builder.mutation<QRCodeResponse, void>({
      query: (body) => ({
        url: "/security/2fa/generate/",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Security", id: "Security" }],
    }),
  }),
});

export const { useGenerateCodeMutation, useGetAllCodeQuery } = securityApi;
