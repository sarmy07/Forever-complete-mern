import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/products/productApi";
import { userApi } from "./features/user/userApi";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import { orderApi } from "./features/order/orderApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});

setupListeners(store.dispatch);
