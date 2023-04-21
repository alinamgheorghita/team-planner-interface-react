import React, { useEffect } from "react";

import "./Projects.scss";

import ProjectCard from "./Components/ProjectCard";

import { useState } from "react";

import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import PersonSmallCard from "../Dashboard/Components/PersonSmallCard/PersonSmallCard";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ControlPoint from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { baseUrl } from "../../utils/constants";

const Projects = () => {
  const [selectedTab, setSelectedTab] = useState("IN_PROGRESS");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");

  const [projectList, setProjectList] = useState([]);
  const [openPersons, setOpenPersons] = useState(false);

  useEffect(() => {
    getData();
  }, [selectedTab]);

  const getData = () => {
    fetch(`${baseUrl}/api/project/getProjectByStatus?status=${selectedTab}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  };

  const handleOpenPersons = () => setOpenPersons(true);
  const handleClosePersons = () => {
    setOpenPersons(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    handleClearInputs();
    setOpen(false);
    setEditMode(false);
  };

  const handleSelectTab = (tab) => {
    setSelectedTab(tab);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickProject = () => {
    handleOpen();
    setEditMode(true);
  };

  const handleClickAssignedPersons = () => {
    console.log("persons.clicked");
    setOpenPersons(true);
  };

  const handleClickRemovePersons = () => {
    console.log("persons.removed");
  };

  const handleClickAddPersons = () => {
    console.log("persons.added");
  };

  const handleCreate = () => {
    let newProject = {
      title: title,
      description: description,
      startDate: startDate,
      deadline: deadline,
    };
    // handleClose();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");

    var raw = JSON.stringify(newProject);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://team-manager-be.herokuapp.com/manager/api/project",
      requestOptions
    ).then((result) => {
      handleClose();
      getData();
    });
  };

  const handleClearInputs = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setDeadline("");
  };

  console.log("title", title);
  console.log("description", description);
  console.log("startDate", startDate);
  console.log("deadline", deadline);

  return (
    <div className="projects-page-container">
      <div className="up-cards-container">
        <div className="up-buttons-container">
          <div className="left-side-buttons">
            <button
              className={
                selectedTab === "IN_PROGRESS" ? "selected" : "not_selected"
              }
              onClick={() => handleSelectTab("IN_PROGRESS")}
            >
              IN PROGRESS
            </button>
            <button
              className={
                selectedTab === "PENDING" ? "selected" : "not_selected"
              }
              onClick={() => handleSelectTab("PENDING")}
            >
              PENDING
            </button>
            <button
              className={
                selectedTab === "FINISHED" ? "selected" : "not_selected"
              }
              onClick={() => handleSelectTab("FINISHED")}
            >
              DONE
            </button>
          </div>

          <button className="add-entity" onClick={handleOpen}>
            ADD ENTITY
          </button>
        </div>
      </div>

      <div className="down-cards-container">
        {projectList.map((project) => (
          <ProjectCard
            title={project.title}
            description={project.description}
            startDate={project.startDate}
            endDate={project.endDate}
            deadline={project.deadline}
            handleClickProject={handleClickProject}
            handleClickAssignedPersons={handleClickAssignedPersons}
          />
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <div className="add-project-modal-container">
            <div className="modal-close-button">
              <CloseIcon onClick={handleClose} />
            </div>
            <p className="modal-title">
              {editMode === true ? "EDIT A PROJECT" : "CREATE A PROJECT"}
            </p>
            <div className="input-container">
              <p className="input-label">Title</p>
              <TextField
                fullWidth
                required
                id="outlined-required"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Description</p>
              <TextField
                fullWidth
                required
                id="outlined-required"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Start date</p>
              <TextField
                id="date"
                type="date"
                defaultValue="2017-05-24"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setStartDate(event.target.value)}
                value={startDate}
              />
            </div>

            <div className="input-container">
              <p className="input-label">Deadline</p>
              <TextField
                id="date"
                type="date"
                defaultValue="2017-05-24"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setDeadline(event.target.value)}
                value={deadline}
              />
            </div>
            {editMode === true && (
              <div className="input-container">
                <p className="input-label">Status</p>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={"IN PROGRESS"}>IN PROGRESS</MenuItem>
                  <MenuItem value={"PEDING"}>PENDING</MenuItem>
                  <MenuItem value={"DONE"}>DONE</MenuItem>
                </Select>
              </div>
            )}
            <div className="modal-buttons-container">
              <Button
                className="modal-button"
                variant="contained"
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openPersons}
        onClose={handleClosePersons}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <div className="assigned-persons-modal-container">
            <div className="modal-close-button">
              <CloseIcon onClick={handleClosePersons} />
            </div>
            <div className="modal-row">
              <div className="left-modal-title">
                ASSIGNED PERSONS
                <div className="assigned-person-container">
                  <RemoveCircleOutlineIcon onClick={handleClickRemovePersons} />
                  <PersonSmallCard name="Alina G" position="INTERN" />
                </div>
                <div className="assigned-person-container">
                  <RemoveCircleOutlineIcon onClick={handleClickRemovePersons} />
                  <PersonSmallCard name="John Doe" position="BACKEND" />
                </div>
              </div>
              <div className="modal-separator"></div>
              <div className="right-modal-title">
                AVAILABLE PERSONS
                <div className="assigned-person-container">
                  <ControlPointIcon onClick={handleClickAddPersons} />
                  <PersonSmallCard name="Andrei Pata" position="FULLSTACK" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
