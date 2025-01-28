import { configureStore } from "@reduxjs/toolkit";

import collectionsReducer from "./collections/collectionsSlice";
import productsReducer from "./products/productsSlice";
import productReducer from "./products/productSlice";
import collectionProductsSlice from "./collections/collectionSlice";

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    collectionProducts: collectionProductsSlice,
    products: productsReducer,
    product: productReducer,

    devTools: true,
  },
});
