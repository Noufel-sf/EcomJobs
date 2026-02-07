import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
    credentials: "include",
  }),

  tagTypes: ["Products", "Product", "Categories"],

  endpoints: (builder) => ({

    // 🔹 All Products (Admin / Public)
    getAllProducts: builder.query({
      query: () => "/product",
      providesTags: ["Products"],
    }),

    // 🔹 Best Selling
    getBestSelling: builder.query({
      query: () => "/product/bestSelling",
      providesTags: ["Products"],
    }),

    // 🔹 Single Product
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // 🔹 Categories
    getCategories: builder.query({
      query: () => "/category",
      transformResponse: (response) => response?.categories || [],
      providesTags: ["Categories"],
    }),

    // 🔹 Create Product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    // 🔹 Update Product
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Product", id },
      ],
    }),

    // 🔹 Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // 🔹 Update Status Only
    updateProductStatus: builder.mutation({
      query: ({ id, active }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: { active },
      }),
      invalidatesTags: ["Products"],
    }),

  }),
});

export const {
  useGetAllProductsQuery,
  useGetBestSellingQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} = productsApi;
