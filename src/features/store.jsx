import { configureStore } from "@reduxjs/toolkit";

import collectionsReducer from "./collections/collectionsSlice";
import productsReducer from "./products/productsSlice";
import productReducer from "./products/productSlice";
import collectionProductsSlice from "./collections/collectionSlice";
import favListReducer from "../features/favorites/favoritesSlice";
import cartSlice from "./../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    collectionProducts: collectionProductsSlice,
    products: productsReducer,
    product: productReducer,
    favorites: favListReducer,
    cart: cartSlice,
    user: userReducer,
  },
  devTools: true,
});
