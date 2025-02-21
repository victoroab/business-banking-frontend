import Cookies from "js-cookie";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
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

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: customBaseQuery,

  tagTypes: ["Card"],

  endpoints: (builder) => ({
    requestCard: builder.mutation<
      any,
      {
        fromAccountNumber: string;
        deliverOption: string;
        cardType: string;
        pickupBranch: string;
        address: string;
        city: string;
        zipCode: string;
      }
    >({
      query: (body) => ({
        url: "/card/request",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Card", id: "Card" }],
    }),
  }),
});

export const { useRequestCardMutation } = cardApi;
