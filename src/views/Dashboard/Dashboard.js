import React from "react";
import { useState, useEffect } from "react";

import "./Dashboard.scss";

import AccountTreeIcon from "@mui/icons-material/AccountTree";

import PersonSmallCard from "./Components/PersonSmallCard/PersonSmallCard";
import ProjectSmallCard from "./Components/ProjectSmallCard/ProjectSmallCard";
import { baseUrl } from "../../utils/constants";

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`${baseUrl}/api/statistics`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStatistics(data);
      });
  };

  return (
    <div className="dashboard-page-container">
      <div className="top-cards-container">
        <div className="card-container blue">
          <div>
            <AccountTreeIcon className="tree-1" />
          </div>
          <div>{statistics.projectsInProgress} projects in progress</div>
        </div>
        <div className="card-container red">
          <div>
            <AccountTreeIcon className="tree-2" />
          </div>
          <div>{statistics.projectsPending} projects pending</div>
        </div>
        <div className="card-container green">
          <div>
            <AccountTreeIcon className="tree-3" />
          </div>
          <div>{statistics.projectsDone} projects done</div>
        </div>
        <div className="card-container orange">
          <div>
            <AccountTreeIcon className="tree-4" />
          </div>
          <div>{statistics?.availablePersons?.length} persons available</div>
        </div>
      </div>
      <div className="bottom-cards-container">
        <div className="big-card">
          <div className="card">Deadlines</div>
          <div className="projects-small-cards">
            {statistics?.upcomingDeadlines?.map((project) => (
              <ProjectSmallCard
                title={project.title}
                description={project.description}
                startDate={project.startDate}
              />
            ))}
          </div>
        </div>

        <div className="big-card">
          <div className="card">Start dates</div>
          <div className="projects-small-cards">
            {statistics?.upcomingStartDates?.map((project) => (
              <ProjectSmallCard
                title={project.title}
                description={project.description}
                startDate={project.startDate}
              />
            ))}
          </div>
        </div>

        <div className="big-card">
          <div className="card">Available persons</div>
          <div className="projects-small-cards">
            {statistics?.availablePersons?.map((person) => (
              <PersonSmallCard
                firstName={person.firstName}
                lastName={person.lastName}
                position={person.position}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
