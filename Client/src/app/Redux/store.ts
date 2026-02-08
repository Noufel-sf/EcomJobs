import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./Services/CartApi";
import { productsApi } from "./Services/ProductsApi";
import { orderApi } from "./Services/OrderApi";
import { authApi } from "./Services/AuthApi";
import authReducer from "./Slices/AuthSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      productsApi.middleware,
      orderApi.middleware,
      authApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
