import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL, 
    credentials: "include", // if using cookies
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({



    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (productId: number) => ({
        url: "/cart",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation({
      query: ({ productId, action }: { productId: number; action: string }) => ({
        url: "/cart",
        method: "PATCH",
        body: { productId, action },
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation({
      query: (productId: number) => ({
        url: "/cart/deleteItem",
        method: "DELETE",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} = cartApi;
