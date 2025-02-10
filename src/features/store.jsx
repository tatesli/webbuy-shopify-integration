import { configureStore } from "@reduxjs/toolkit";

import collectionsReducer from "./collections/collectionsSlice";
import productsReducer from "./products/productsSlice";
import productReducer from "./products/productSlice";
import collectionProductsSlice from "./collections/collectionSlice";
import cartSlice from "./../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    collectionProducts: collectionProductsSlice,
    products: productsReducer,
    product: productReducer,
    cart: cartSlice,
  },
  devTools: true,
});
