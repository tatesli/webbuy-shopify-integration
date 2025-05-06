import React from "react";
import { Route, Routes } from "react-router-dom";

import Cart from "../Cart";
import Checkout from "../Checkout";
import Collection from "../Collection";
import Favorites from "../Favorites";
import Orders from "../Orders";
import Home from "../Home";
import ProductDetails from "../ProductDetails";
import Help from "../Help";
import Terms from "../Terms";

export const ROUTES = {
  HOME: "/",
  CART: "/cart",
  FAVORITES: "/favorites",
  ORDERS: "/orders",
  PRODUCT: "/products/:productId",
  COLLECTION: "/collections/:collectionId",
  CHECKOUT: "/checkout",
  HELP: "/help",
  TERMS: "/terms",
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.COLLECTION} element={<Collection />} />
      <Route path={ROUTES.PRODUCT} element={<ProductDetails />} />
      <Route
        path={`${ROUTES.COLLECTION}${ROUTES.PRODUCT}`}
        element={<ProductDetails />}
      />
      <Route path={ROUTES.FAVORITES} element={<Favorites />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.ORDERS} element={<Orders />} />
      <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
      <Route path={ROUTES.HELP} element={<Help />} />
      <Route path={ROUTES.TERMS} element={<Terms />} />
    </Routes>
  );
};

export default AppRoutes;
