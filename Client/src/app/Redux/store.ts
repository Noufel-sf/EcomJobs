import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./Services/CartApi";
import { productsApi } from "./Services/ProductsApi";
import { orderApi } from "./Services/OrderApi";
import { authApi } from "./Services/AuthApi";
import { classificationApi } from "./Services/ClassificationApi";
import authReducer from "./Slices/AuthSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [classificationApi.reducerPath]: classificationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      productsApi.middleware,
      orderApi.middleware,
      authApi.middleware,
      classificationApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
