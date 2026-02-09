import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

interface Classification {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GetAllClassificationsResponse {
  classifications: Classification[];
}

interface CreateClassificationData {
  name: string;
  description?: string;
}

interface UpdateClassificationData {
  id: string;
  name?: string;
  description?: string;
}

export const classificationApi = createApi({
  reducerPath: "classificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/classification`,
    credentials: "include",
  }),
  tagTypes: ["Classifications"],
  endpoints: (builder) => ({

    // 🔹 Get All Classifications
    getAllClassifications: builder.query<GetAllClassificationsResponse, void>({
      query: () => "/",
      providesTags: ["Classifications"],
    }),

    // 🔹 Add Classification
    addClassification: builder.mutation<Classification, CreateClassificationData>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Classifications"],
    }),

    // 🔹 Update Classification
    updateClassification: builder.mutation<Classification, UpdateClassificationData>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Classifications"],
    }),

    // 🔹 Delete Classification
    deleteClassification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classifications"],
    }),

  }),
});


export const {
  useGetAllClassificationsQuery,
  useAddClassificationMutation,
  useUpdateClassificationMutation,
  useDeleteClassificationMutation,
} = classificationApi;
