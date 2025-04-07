import React, { useEffect } from "react";
import { SnackbarProvider } from "notistack";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import UserForm from "../User/UserForm";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

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
    <SnackbarProvider maxSnack={3}>
      <div className="app">
        <Header />
        <UserForm />
        <div className="container">
          <Sidebar />
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </SnackbarProvider>
  );
};

export default App;
