import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCollections } from "../../features/collections/collectionsSlice";
import { getProducts } from "../../features/products/productsSlice";

import AppRoutes from "../Routes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollections());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
};

export default App;
