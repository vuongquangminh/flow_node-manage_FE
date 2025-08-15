import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductRes } from "../../type/api";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api/",
  }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProduct: build.query<
      {
        data?: ProductRes[];
        message: string;
        total: number;
        currentPage: number;
        totalPages: number;
      },
      { type_bag?: string; page?: number }
    >({
      query: (params) => ({
        url: `products`,
        params: params,
      }),
    }),
    searchProduct: build.query<
      {
        data?: ProductRes[];
        message: string;
      },
      { name?: string}
    >({
      query: (params) => ({
        url: `products/search`,
        params: params,
      }),
    }),
    getProductInf: build.infiniteQuery<
      {
        data?: ProductRes[];
        message: string;
        total: number;
        currentPage: number;
        totalPages: number;
      },
      { type_bag?: string; page?: number },
      number
    >({
      infiniteQueryOptions: {
        // Must provide a `getNextPageParam` function
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          return lastPage.currentPage <= lastPage.totalPages
            ? Number(lastPageParam) + 1
            : undefined;
        },
      },
      // The `query` function receives `{queryArg, pageParam}` as its argument
      query({ queryArg, pageParam }) {
        return `/products?page=${pageParam}&type_bag=${
          queryArg.type_bag ?? ""
        }`;
      },
    }),
    getProductDetail: build.query<
      {
        data?: ProductRes;
        message: string;
      },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `products/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductInfInfiniteQuery,
  useGetProductDetailQuery,
  useLazySearchProductQuery
} = productApi;
