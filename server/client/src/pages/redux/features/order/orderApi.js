import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/order/create",
        method: "POST",
        body: newOrder,
      }),
    }),
    getOrders: builder.query({
      query: () => "/order/all-orders",
    }),
    getOrder: builder.query({
      query: (id) => `/order/${id}`,
    }),
    getOrderByUser: builder.query({
      query: (userId) => `/order/user/${userId}`,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetOrderByUserQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
