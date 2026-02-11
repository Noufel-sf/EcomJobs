import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order } from "@/lib/DatabaseTypes";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://wadkniss-1.onrender.com";

interface CreateOrderRequest {
  firstName: string;
  lastName: string;
  note:string ;
  state:string ;
  city: string;
  notes?: string;
  products: {
    product: string;
    name: string;
    size: string;
    prodNb: number;
  }[];
  total: number;
}

interface CreateOrderResponse {
  orderId: string;
  message: string;
}

interface GetSellerOrdersParams {
  Seller_id?: string;
  page?: number;
  limit?: number;
}

interface GetSellerOrdersResponse {
  orders: Order[];
  totalPages: number;
  currentPage: number;
  totalOrders: number;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/orders`,
    // credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
   
   
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (orderData) => ({
        url: "/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    getSellerOrders: builder.query<
      GetSellerOrdersResponse,
      GetSellerOrdersParams | void
    >({
      query: (params) => ({
        url: "/",
        params: {
          Seller_id: params?.Seller_id,
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
        },
      }),
      providesTags: ["Orders"],
    }),

    DeleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation<
      void,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetSellerOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
