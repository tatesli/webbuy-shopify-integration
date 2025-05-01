import React from "react";
import { useParams } from "react-router-dom";

import { AdditionalFilters } from "../AdditionalFilters";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { UserForm } from "../User";

import "./Layout.modules.css";

export const Layout = ({ children }) => {
  const params = useParams();

  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="sidebar">
          <Sidebar />
          {params.collectionId && !params.productId && <AdditionalFilters />}
        </div>
        <div className="container">{children}</div>
      </div>
      <Footer />
      <UserForm />
    </div>
  );
};
