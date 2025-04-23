import React from "react";
import Header from "../../components/Header/Header";
import UserForm from "../../components/User/UserForm";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./Layout.modules.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="container">{children}</div>
      </div>
      <Footer />
      <UserForm />
    </div>
  );
};

export default Layout;
