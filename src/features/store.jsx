import { configureStore } from "@reduxjs/toolkit";

import collectionsReducer from "./collections/collectionsSlice";
import productsReducer from "./products/productsSlice";
import productReducer from "./products/productSlice";

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    products: productsReducer,
    product: productReducer,

    devTools: true,
  },
});
