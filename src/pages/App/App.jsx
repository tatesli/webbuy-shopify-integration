import React, { useEffect } from "react";
import AppRoutes from "../Routes/Routes";

import { useDispatch } from "react-redux";
import { getCollections } from "../../features/collections/collectionsSlice";
import { getProducts } from "../../features/products/productsSlice";

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
