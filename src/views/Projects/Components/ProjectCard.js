import React from "react";

import "./ProjectCard.scss";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

const ProjectCard = (props) => {
  const {
    title,
    description,
    startDate,
    endDate,
    deadline,
    handleClickProject,
    handleClickAssignedPersons,
  } = props;

  return (
    <div className="project-card">
      <div className="row">
        {title}
        <div className="icons-container">
          <EditIcon onClick={handleClickProject} />{" "}
          <PeopleAltIcon onClick={handleClickAssignedPersons} />
        </div>
      </div>
      <div className="column">{description}</div>
      <div>
        <h2 className="start">
          Start: {startDate && moment(startDate).format("DD.MM.YYYY")}
        </h2>
        <p className="deadline">
          Deadline: {deadline && moment(deadline).format("DD.MM.YYYY")}
        </p>
        <p className="end-date">
          End Date: {endDate && moment(endDate).format("DD.MM.YYYY")}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
