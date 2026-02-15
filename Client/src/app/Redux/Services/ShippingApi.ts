import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ShippingState {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  available: boolean;
}

export interface UpdateShippingPriceRequest {
  ownerId: string;
  stateID: string;
  price: number;
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

    updateShippingPrice: builder.mutation<
      ShippingState,
      UpdateShippingPriceRequest
    >({
      query: ({ ownerId, ...data }) => ({ 
        url: `/${ownerId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ShippingStates"],
    }),

    activateShippingStates: builder.mutation<
      { message: string },
      { stateIds: string[] }
    >({
      query: ({ stateIds }) => ({
        url: `/activate/${stateIds}`,
        method: "POST",
      }),
      invalidatesTags: ["ShippingStates"],
    }),

    deactivateShippingStates: builder.mutation<
      { message: string },
      { stateIds: string[] }
    >({
      query: ({ stateIds }) => ({
        url:`/deactivate/${stateIds}`,
        method: "POST",
      }),
      invalidatesTags: ["ShippingStates"],
    }),

  
  }),
});

export const {
  useGetAllShippingSellerStatesQuery,
  useUpdateShippingPriceMutation,
  useActivateShippingStatesMutation,
  useDeactivateShippingStatesMutation,
} = shippingApi;