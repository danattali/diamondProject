import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import Cookies from "js-cookie";
import favouriteReducer from "./favouriteSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
  },
});
store.subscribe(() => {
  const state = store.getState();
  if (state) {
    Cookies.set("cart", JSON.stringify(state.cart));
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
