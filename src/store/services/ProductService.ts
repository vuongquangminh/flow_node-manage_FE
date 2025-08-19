import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductReq, ProductRes } from "../../type/api";
import headerTokenRequest from "../../utils/headerTokenRequest";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api/",
    prepareHeaders: (headers) => headerTokenRequest(headers),
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
      providesTags: ["Product"],
    }),
    searchProduct: build.query<
      {
        data?: ProductRes[];
        message: string;
      },
      { name?: string }
    >({
      query: (params) => ({
        url: `products/search`,
        params: params,
      }),
      providesTags: ["Product"],
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
      providesTags: ["Product"],
    }),
    addProduct: build.mutation<
      {
        data?: ProductRes;
        message: string;
      },
      ProductReq
    >({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation<
      {
        data?: ProductRes;
        message: string;
      },
      ProductReq & { id: number }
    >({
      query: (body) => ({
        url: `/product/${body.id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation<ProductRes, { id: number }>({
      query: ({ id }) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
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
      providesTags: ["Product"],
    }),
    getAllProductAdmin: build.query<
      { data?: ProductRes[] },
      { onError?: () => void }
    >({
      query: () => ({
        url: `admin/products`,
      }),
      providesTags: ["Product"],
      async onQueryStarted({ onError }, { queryFulfilled }) {
        try {
          await queryFulfilled; // Chờ API call thành công
        } catch {
          onError?.();
        }
      },
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductInfInfiniteQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductDetailQuery,
  useLazySearchProductQuery,
  useGetAllProductAdminQuery,
  useDeleteProductMutation,
} = productApi;
