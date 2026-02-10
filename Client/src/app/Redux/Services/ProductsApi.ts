import { Product } from "@/lib/DatabaseTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GetAllProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface GetAllProductsResponse {
  content: Product[];
  totalProducts: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  "https://wadkniss-1.onrender.com/api/v1/products",
    // credentials: "include",
  }),

  tagTypes: ["Products", "Product", "Categories"],

  endpoints: (builder) => ({
    
    
    getAllProducts: builder.query<GetAllProductsResponse, GetAllProductsParams | void>({
      query: (params) => ({
        url: "",
        params: params ? {
          ...(params.page && { page: params.page }),
          ...(params.limit && { limit: params.limit }),
          ...(params.category && { category: params.category }),
          ...(params.minPrice && { minPrice: params.minPrice }),
          ...(params.maxPrice && { maxPrice: params.maxPrice }),
        } : undefined,
      }),
      providesTags: ["Products"],
    }),

    getBestSelling: builder.query<{ content: Product[] }, void>({
      query: () => "/bestSelling",
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    getSellerProducts: builder.query({
      query: (sellerId) => `/seller/${sellerId}`,
      providesTags: ["Products"],
    }),


    searchProducts: builder.query({
      query: ({ query, category, minPrice, maxPrice, page, limit }) => ({
        url: "/search",
        params: {
          q: query,
          ...(category && { category }),
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice }),
          ...(page && { page }),
          ...(limit && { limit }),
        },
      }),
      providesTags: ["Products"],
    }),

    getCategories: builder.query({
      query: () => "/category",
      transformResponse: (response) => response?.categories || [],
      providesTags: ["Categories"],
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Product", id },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    updateProductStatus: builder.mutation({
      query: ({ id, active }) => ({
        url: `/${id}`,
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
  useGetSellerProductsQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} = productsApi;
