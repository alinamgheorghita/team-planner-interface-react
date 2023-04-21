import React from "react";
import "./Layout.scss";
import SideMenu from "../SideMenu/SideMenu";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="right-side">
        <div className="header">
          <Header />
        </div>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
