import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product/products",
      providesTags: ["Product"],
      refetchOnMount: true,
    }),
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/product/create",
        method: "POST",
        body: newProduct,
        credentails: "include",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
} = productApi;
