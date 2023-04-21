import React, { useEffect } from "react";

import "./Persons.scss";

import PersonCard from "./Components/PersonCard";

import { useState } from "react";

import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";
import { baseUrl } from "../../utils/constants";

const Persons = () => {
  const [selectedTab, setSelectedTab] = useState("AVAILABLE");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");

  const [personsList, setPersonsList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    getData();
  }, [selectedTab]);

  const getData = () => {
    fetch(
      `${baseUrl}/api/person/getPersonsByAvailabilityStatus?status=${selectedTab}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPersonsList(data);
      });
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

  const handleEdit = () => {
    handleClose();
  };

  const handleDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://team-manager-be.herokuapp.com/manager/api/person/delete?personId=${selectedPerson.id}`,
      requestOptions
    );
  };

  const handleClickPerson = (person) => {
    handleOpen();
    setEditMode(true);
    setSelectedPerson(person);
  };

  const handleCreate = () => {
    let newPerson = {
      firstName: firstName,
      lastName: lastName,
      position: position,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");

    var raw = JSON.stringify(newPerson);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://team-manager-be.herokuapp.com/manager/api/person/create",
      requestOptions
    ).then((result) => {
      handleClose();
      getData();
    });
  };

  const handleClearInputs = () => {
    setFirstName("");
    setLastName("");
    setPosition("");
  };

  return (
    <div className="persons-page-container">
      <div className="top-buttons-container">
        <div className="left-side-buttons">
          <button
            className={
              selectedTab === "AVAILABLE" ? "selected" : "not_selected"
            }
            onClick={() => handleSelectTab("AVAILABLE")}
          >
            AVAILABLE
          </button>
          <button
            className={
              selectedTab === "UNAVAILABLE" ? "selected" : "not_selected"
            }
            onClick={() => handleSelectTab("UNAVAILABLE")}
          >
            ON PROJECT
          </button>
        </div>
        <div className="right-side-buttons">
          <button onClick={handleOpen}>ADD ENTITY</button>
        </div>
      </div>

      <div className="down-column-container">
        {personsList.map((person) => (
          <PersonCard
            firstName={person.firstName}
            lastName={person.lastName}
            position={person.position}
            handleClickPerson={() => handleClickPerson(person)}
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
          <div className="edit-project-modal-container">
            <div className="modal-close-button">
              <CloseIcon onClick={handleClose} />
            </div>
            <p className="modal-title">
              {editMode === true ? "EDIT PERSON" : "CREATE A PERSON"}
            </p>
            <div className="input-container">
              <p className="input-label">First Name</p>
              <TextField
                fullWidth
                required
                id="outlined-required"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Last Name</p>
              <TextField
                fullWidth
                required
                id="outlined-required"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Position</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(event) => setPosition(event.target.value)}
                value={position}
                fullWidth
              >
                <MenuItem value={"FRONTEND"}>FRONTEND</MenuItem>
                <MenuItem value={"BACKEND"}>BACKEND</MenuItem>
                <MenuItem value={"INTERN"}>INTERN</MenuItem>
                <MenuItem value={"FULLSTACK"}>FULLSTACK</MenuItem>
              </Select>
            </div>
            <div className="modal-buttons-container">
              {editMode === true && (
                <>
                  <Button
                    className="modal-button"
                    variant="contained"
                    onClick={handleEdit}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="modal-button"
                    variant="contained"
                    onClick={handleDelete}
                    sx={{ marginLeft: "10px" }}
                  >
                    DELETE
                  </Button>
                </>
              )}
              {editMode === false && (
                <Button
                  className="modal-button"
                  variant="contained"
                  onClick={handleCreate}
                >
                  CREATE
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Persons;
