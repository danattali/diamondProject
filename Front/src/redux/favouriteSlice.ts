import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface FavouriteItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface FavouriteState {
  items: FavouriteItem[];
}

const loadState = (): FavouriteState => {
  try {
    const state = Cookies.get("favourite");
    if (state === undefined) {
      return { items: [] };
    }
    return JSON.parse(state);
  } catch (e) {
    console.log(e);
  }
  return { items: [] };
};

const initialState: FavouriteState = loadState();

const FavouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      if (
        state.items.some(
          (item: FavouriteItem) => item._id === action.payload._id
        )
      ) {
        return;
      }
      state.items.push(action.payload);
      saveState(state);
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: FavouriteItem) => item._id !== action.payload
      );
      saveState(state);
    },
    setFavourites: (state, action: PayloadAction<FavouriteItem[]>) => {
      state.items = action.payload;
      saveState(state);
    },
  },
});

const saveState = (state: FavouriteState) => {
  try {
    const serialisedState = JSON.stringify(state);
    Cookies.set("favourite", serialisedState);
  } catch (e) {
    console.log(e);
  }
};

export const { addFavourite, removeFavourite, setFavourites } =
  FavouriteSlice.actions;
export default FavouriteSlice.reducer;
