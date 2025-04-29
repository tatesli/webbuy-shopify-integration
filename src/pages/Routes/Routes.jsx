import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";
import SingleProduct from "../SingleProduct/SingleProduct";
import SingleCollection from "../SingleCollection/SingleCollection";
import Favorites from "../Favorites/Favorites";
import Cart from "../Cart/Cart";

export const ROUTES = {
  HOME: "/",
  CART: "/cart",
  FAVORITES: "/favorites",
  PRODUCT: "/products/:productId",
  COLLECTION: "/collections/:collectionId",
};
const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.COLLECTION} element={<SingleCollection />} />
      <Route
        path={`${ROUTES.COLLECTION}/:productId`}
        element={<SingleProduct />}
      />
      <Route path={ROUTES.FAVORITES} element={<Favorites />} />
      <Route path={ROUTES.CART} element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
