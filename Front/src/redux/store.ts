import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import Cookies from 'js-cookie';
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
});
store.subscribe(() => {
    const state = store.getState();
   if(state){
Cookies.set("cart", JSON.stringify(state.cart));
   }
}
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;