import React from "react";

import "./PersonCard.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PersonCard = (props) => {
  const { firstName, lastName, position, handleClickPerson } = props;

  return (
    <div onClick={handleClickPerson} className="person-card">
      <div className="user-icon-container">
        <AccountCircleIcon className="user-icon" />
      </div>
      <div className="person-available-container">
        <h2 className="person-name">
          {firstName} {lastName}
        </h2>
        <p className="person-job">{position}</p>
      </div>
    </div>
  );
};
export default PersonCard;
