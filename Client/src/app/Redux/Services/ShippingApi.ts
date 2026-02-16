import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ShippingState {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  available: boolean;
}

export interface UpdateShippingsRequest {
  ownerId: string;
  stateID: string;
  price : number;
}
const API_URL = "https://wadkniss.onrender.com/api/v1";

export interface UpdateShippingStatusRequest {
  stateIds: string[];
  available: boolean;
}

export const shippingApi = createApi({
  reducerPath: "shippingApi",
  baseQuery: fetchBaseQuery({
   
     baseUrl: `${API_URL}/deliverycosts`,
   
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["ShippingStates"],
 
  endpoints: (builder) => ({

    

    getAllShippingSellerStates: builder.query<{ data: ShippingState[]  }, void>({
      query: (id) => `/${id}`,
      providesTags: ["ShippingStates"],

    }),

    updateShippings: builder.mutation<
      ShippingState,
      UpdateShippingsRequest
    >({
      query: ({ ownerId, ...data }) => ({ 
        url: `/${ownerId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ShippingStates"],
    }),

  

  
  }),
});

export const {
  useGetAllShippingSellerStatesQuery,
  useUpdateShippingsMutation,
} = shippingApi;