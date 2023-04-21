import React, { useEffect } from "react";

import "./Header.scss";

import image from "../../assets/icons/image.JPG";

import { useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [title, setTitle] = useState("DASHBOARD");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setTitle("DASHBOARD");
        // code block
        break;
      case "/projects":
        setTitle("PROJECTS");
        break;
      case "/persons":
        setTitle("PERSONS");
        break;
      default:
    }
  }, [location]);

  return (
    <div className="header-container">
      <h1 className="title">{title}</h1>
      <div className="image-details">
        <h1 className="profile">Alina G</h1>
        <div>
          <img alt="" className="user-picture" src={image} />
        </div>
      </div>
    </div>
  );
};

export default Header;
