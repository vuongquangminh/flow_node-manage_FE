import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderReq, OrderRes } from "../../type/api";
import headerTokenRequest from "../../utils/headerTokenRequest";
import { clearCart } from "../slices/cartSlice";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api/",
    prepareHeaders: (headers) => headerTokenRequest(headers),
  }),
  tagTypes: ["Order"],
  endpoints: (build) => ({
    getOrder: build.query<OrderRes, { user_id: number }>({
      query: ({ user_id }) => ({
        url: `orders/${user_id}`,
      }),
      providesTags: ["Order"],
    }),
    addOrder: build.mutation<OrderRes, OrderReq>({
      query: (body) => ({
        url: `order`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          dispatch(clearCart()); // Await the completion of the mutation
        } catch (error) {
          console.error("Mutation failed:", error);
        }
      },
    }),
  }),
});

export const { useGetOrderQuery, useAddOrderMutation } = orderApi;
