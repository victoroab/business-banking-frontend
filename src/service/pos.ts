import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store/store";
import { queryBuilder } from "../utils";
import { AddPos } from "../interfaces/Global";
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
    window.location.href = "/";
  }
  return baseResult;
};

export const posApi = createApi({
  reducerPath: "posApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Pos"],

  endpoints: (builder) => ({
    //addPos
    addPos: builder.mutation<any, AddPos>({
      query: (body) => ({
        url: "/pos/request",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Pos", id: "Pos" }],
    }),

    //pos
    getAllPos: builder.query({
      query: (params) => `/pos/request?${queryBuilder(params)}`,
      providesTags: [{ type: "Pos", id: "Pos" }],
    }),
  }),
});

export const { useAddPosMutation, useGetAllPosQuery } = posApi;
