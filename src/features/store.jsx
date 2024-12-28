import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./collections/collectionsSlice";
import productsReducer from "./products/productsSlice";

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    products: productsReducer,
    devTools: true,
  },
});
