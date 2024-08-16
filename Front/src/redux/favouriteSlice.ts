import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface FavouriteItem {
  _id: string;
  name: string;
  price: number;
}

interface FavouriteState {
  items: FavouriteItem[];
}

const loadState = (): FavouriteState => {
  const favourite = Cookies.get("favourite");
  return favourite ? JSON.parse(favourite) : { items: [] };
};

const FavouriteSlice = createSlice({
  name: "favourite",
  initialState: loadState(),
  reducers: {
    addFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (!item) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addFavourite, removeFavourite } = FavouriteSlice.actions;
export default FavouriteSlice.reducer;
