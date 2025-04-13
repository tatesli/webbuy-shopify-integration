import { createSlice } from "@reduxjs/toolkit";

const loadFavListFromLocalStorage = () => {
  const storedFavList = localStorage.getItem("favorites");
  return storedFavList ? JSON.parse(storedFavList) : [];
};
const initialState = {
  favListItem: loadFavListFromLocalStorage(),
};
const saveFavListToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const favListSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavList: (state, action) => {
      if (
        state.favListItem.findIndex((item) => item.id === action.payload.id) ===
        -1
      ) {
        state.favListItem = [...state.favListItem, action.payload];
      }
      saveFavListToLocalStorage(state.favListItem);
    },
    removeFromFavList: (state, action) => {
      state.favListItem = state.favListItem.filter(
        (item) => item.id !== action.payload
      );
      saveFavListToLocalStorage(state.favListItem);
    },
  },
});

export const { addToFavList, removeFromFavList } = favListSlice.actions;
export const getFavorites = (state) => state.favorites.favListItem;
export default favListSlice.reducer;
