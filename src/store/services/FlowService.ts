import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import headerTokenRequest from "../../utils/headerTokenRequest";

export const flowApi = createApi({
  reducerPath: "flowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/api/',
    prepareHeaders: (headers) => headerTokenRequest(headers),
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
