import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store/store";
import Cookies from "js-cookie";
import { queryBuilder } from "../utils";

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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,

  tagTypes: ["User"],

  endpoints: (builder) => ({
    //setPhone
    setPhone: builder.mutation<any, { phoneNumber: string }>({
      query: (body) => ({
        url: "/user/set-phone",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "User", id: "User" }],
    }),

    //verify-phone
    verfifyPhone: builder.mutation<any, { phoneNumber: string; otp: string }>({
      query: (body) => ({
        url: "/user/verify-phone",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "User", id: "User" }],
    }),

    //set-email
    setEmail: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/user/set-email",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "User", id: "User" }],
    }),

    //verify-phone
    verfifyEmail: builder.mutation<any, { otp: string; email: string }>({
      query: (body) => ({
        url: "/user/verify-email",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "User", id: "User" }],
    }),

    //roles
    getAllRoles: builder.query<any, void>({
      query: () => `/role`,
      providesTags: [{ type: "User", id: "User" }],
    }),

    //Invite
    inviteUser: builder.mutation<
      any,
      { businessId: string; email: string; roleId: string }
    >({
      query: (body) => ({
        url: "/business-user/invite",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "User", id: "User" }],
    }),

    //activities
    getAllActivities: builder.query<any, any>({
      query: (params) => `/activity?${queryBuilder(params)}`,
      providesTags: [{ type: "User", id: "User" }],
    }),
  }),
});

export const {
  useSetPhoneMutation,
  useVerfifyPhoneMutation,
  useSetEmailMutation,
  useVerfifyEmailMutation,
  useGetAllRolesQuery,
  useInviteUserMutation,
  useGetAllActivitiesQuery,
} = userApi;
