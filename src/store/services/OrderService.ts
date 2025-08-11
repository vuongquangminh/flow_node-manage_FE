import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderReq, OrderRes } from "../../type/api";
import headerTokenRequest from "../../utils/headerTokenRequest";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api/",
    prepareHeaders: (headers) => headerTokenRequest(headers),
  }),
  tagTypes: ["Order"],
  endpoints: (build) => ({
    addOrder: build.mutation<OrderRes, OrderReq>({
      query: (body) => ({
        url: `order`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useAddOrderMutation } = orderApi;
