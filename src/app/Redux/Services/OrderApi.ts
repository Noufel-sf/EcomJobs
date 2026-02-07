import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

/// import the types order and order item
// import { Order, OrderItem, Product } from "@/types/order";

interface CreateOrderResponse {
  url: string;
}

// interface GetMyOrdersResponse {
//   orders: Order[];
// }

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/order`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, void>({
      query: () => ({
        url: "/",
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),

    // getMyOrders: builder.query<GetMyOrdersResponse, void>({
    //   query: () => "/",
    //   providesTags: ["Orders"],
    // }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
