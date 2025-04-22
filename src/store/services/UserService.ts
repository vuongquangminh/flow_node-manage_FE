import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRes } from "../../type/api";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const token = (getState() as any).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query<UserRes, string>({
      query: () => `account`,
    }),
    createUser: build.mutation<UserRes, string>({
      query: (name) => ({
        url: `pokemon/${name}`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useCreateUserMutation } = userApi;
