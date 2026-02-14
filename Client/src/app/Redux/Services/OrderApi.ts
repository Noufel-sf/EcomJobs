import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order } from "@/lib/DatabaseTypes";

const API_URL = "https://wadkniss.onrender.com/api/v1";

interface CreateOrderRequest {
  firstName: string;
  lastName: string;
  note:string ;
  state:number ;
  city: string;
  products: {
    product: string;
    size: string;
    prodNb: number;
    color:string ;
  }[];
}

interface CreateOrderResponse {
  orderId: string;
  message: string;
}

interface GetSellerOrdersParams {
  Seller_id?: string;
  page?: number;
  size?: number;
}

interface GetSellerOrdersResponse {
  content: Order[];
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
        url: "",
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
        url: `/${params?.Seller_id}`,
        params: {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
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
        url: `/${orderId}`,
        method: "PUT",
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
