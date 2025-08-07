import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductRes } from "../../type/api";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api/",
  }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProduct: build.query<ProductRes[], { type_bag?: string }>({
      query: () => ({
        url: `products`,
      }),
    }),
  }),
});

export const { useGetProductQuery } = productApi;
