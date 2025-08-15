import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRes } from "../../type/api";
import headerTokenRequest from "../../utils/headerTokenRequest";

type TLoginRes = {
  message: string;
  token: string;
  user: {
    _id: number;
    name: string;
    email: string;
    password: string;
    status: boolean;
    createAt: string;
    upDateAt: string;
  };
  status: boolean;
};
type TLoginReq = {
  email: string;
  password: string;
};

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api/",
    prepareHeaders: (headers) => headerTokenRequest(headers),
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    login: build.mutation<TLoginRes, TLoginReq>({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: TLoginRes, meta) => {
        return {
          ...response,
          status: meta?.response ? meta?.response.ok : false,
        };
      },
    }),
    getMe: build.query<UserRes, void>({
      query: () => `account/me`,
    }),
    getUser: build.query<UserRes[], void>({
      query: () => `account`,
      providesTags: ["User"]
    }),
    getUserById: build.query<UserRes[], { id: number }>({
      query: ({ id }) => `account/${id}`,
    }),
    createUser: build.mutation<
      UserRes,
      { name: string; email: string; password: string }
    >({
      query: (body) => {
        return {
          url: `account/register`,
          method: "POST",
          body: body,
        };
      },
    }),
    deleteUser: build.mutation<{ message: string }, { id: number }>({
      query: (body) => {
        return {
          url: `admin/account/${body.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useDeleteUserMutation,
} = userApi;
