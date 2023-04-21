import React from "react";

import "./SideMenu.scss";

import GroupIcon from "@mui/icons-material/Group";

import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

import AccountTreeIcon from "@mui/icons-material/AccountTree";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const SideMenu = () => {
  const [selectedTab, setSelectedTab] = useState("DASHBOARD");
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setSelectedTab("DASHBOARD");
        // code block
        break;
      case "/projects":
        setSelectedTab("PROJECTS");
        break;
      case "/persons":
        setSelectedTab("PERSONS");
        break;
      default:
        break;
    }
  }, [location]);

  const handleLogOut = () => {
    history.push("/");
  };

  return (
    <div className="side-menu-container">
      <h1 className="title">PLANNER</h1>
      <div className="menu">Menu</div>
      <div className="buttons-container">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <button
            className={
              selectedTab === "DASHBOARD" ? "selected" : "not_selected"
            }
          >
            <AutoAwesomeMosaicIcon className="icon" />
            DASHBOARD
          </button>
        </Link>

        <Link to="/projects" style={{ textDecoration: "none" }}>
          <button
            className={selectedTab === "PROJECTS" ? "selected" : "not_selected"}
          >
            <AccountTreeIcon className="icon" />
            PROJECTS
          </button>
        </Link>

        <Link to="/persons" style={{ textDecoration: "none" }}>
          <button
            className={selectedTab === "PERSONS" ? "selected" : "not_selected"}
          >
            <GroupIcon className="icon" />
            PERSONS
          </button>
        </Link>

        <button className="log-out" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
