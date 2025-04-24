import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from "../../hooks/localStorage";

export const flowApi = createApi({
  reducerPath: "flowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = getLocalStorage({ key: "token" });

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Flow"],
  endpoints: (build) => ({
    getFlowById: build.query<unknown, { id: number }>({
      query: ({ id }) => ({
        url: `flow`,
        params: { _id: id },
      }),
    }),
    addFlow: build.mutation<unknown, unknown>({
      query: (body: unknown) => ({
        url: `flow`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetFlowByIdQuery, useAddFlowMutation } = flowApi;
