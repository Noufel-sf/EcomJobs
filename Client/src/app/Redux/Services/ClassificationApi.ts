import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://wadkniss.onrender.com/api/v1";

interface Classification {
  id: string;
  name: string;
  desc?: string;
}

interface GetAllClassificationsResponse {
  content: Classification[];
}

interface CreateClassificationData {
  name: string;
  desc?: string;
}

interface UpdateClassificationData {
  id: string;
  name?: string;
  desc?: string;
}

export const classificationApi = createApi({
  reducerPath: "classificationApi",
  baseQuery: fetchBaseQuery({

    baseUrl: `${API_URL}/classifications`,
  }),
  tagTypes: ["Classifications"],
  endpoints: (builder) => ({

    getAllClassifications: builder.query<GetAllClassificationsResponse, void>({
      query: () => "",
      providesTags: ["Classifications"],
    }),

    addClassification: builder.mutation<Classification, CreateClassificationData>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Classifications"],
    }),

    updateClassification: builder.mutation<Classification, UpdateClassificationData>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Classifications"],
    }),

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
