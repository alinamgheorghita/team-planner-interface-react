import React from "react";

import "./PersonSmallCard.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PersonSmallCard = (props) => {
  const { firstName, lastName, position } = props;

  return (
    <div className="person-main-container">
      <div className="person-container">
        <div className="person-icon-container">
          <AccountCircleIcon className="person-icon" />
        </div>
        <div className="person-details-container">
          <h2 className="person-first-name">{firstName}</h2>
          <h2 className="person-last-name">{lastName}</h2>
          <p className="person-job">{position}</p>
        </div>
      </div>

      <div className="separator" />
    </div>
  );
};
export default PersonSmallCard;
