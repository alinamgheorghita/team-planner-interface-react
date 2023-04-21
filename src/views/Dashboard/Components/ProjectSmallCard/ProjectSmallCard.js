import React from "react";

import "./ProjectSmallCard";

import InventoryIcon from "@mui/icons-material/Inventory";
import moment from "moment";

const ProjectSmallCard = (props) => {
  const { title, description, startDate } = props;

  return (
    <div className="project-main-container">
      <div className="project-container">
        <div className="icon-container">
          <InventoryIcon className="icons" />
        </div>
        <div>
          <h2 className="projects">{title}</h2>
          <p className="description">{description}</p>
        </div>
        <div className="date">
          Start: {startDate && moment(startDate).format("DD.MM.YYYY")}
        </div>
      </div>
      <div className="separators" />
    </div>
  );
};

export default ProjectSmallCard;
