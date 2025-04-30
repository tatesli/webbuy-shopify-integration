import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";
import SingleProduct from "../SingleProduct/SingleProduct";
import SingleCollection from "../SingleCollection/SingleCollection";
import Favorites from "../Favorites/Favorites";
import Cart from "../Cart/Cart";
import Checkout from "../../components/Checkout/Checkout";

export const ROUTES = {
  HOME: "/",
  CART: "/cart",
  FAVORITES: "/favorites",
  PRODUCT: "/products/:productId",
  COLLECTION: "/collections/:collectionId",
  CHECKOUT: "/checkout",
};
const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.COLLECTION} element={<SingleCollection />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path={ROUTES.FAVORITES} element={<Favorites />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
    </Routes>
  );
};

export default AppRoutes;
