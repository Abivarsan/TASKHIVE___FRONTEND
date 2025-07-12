import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import TextField from "@mui/material/TextField";

import "./Styles/FormStyle.css";
import { useLocation, useNavigate } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";

export default function TaskCreationCom() {
  const [validated, setValidated] = useState(false);

  const location = useLocation();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [dependancies, setDependancies] = useState("");
  const [priority, setPriority] = useState("");

  const [createdDate, setCreatedDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [timeDuration, setTimeDuration] = useState();

  const selectedDevId = location.state.selectedDevId;

  const selectedId = location.state.selectedId;

  console.log("task page :" + selectedDevId + " " + selectedId);

  const handleTNameChange = (value) => {
    setTaskName(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleTechChange = (value) => {
    setTechnologies(value);
  };

  const handleDependancyChange = (value) => {
    setDependancies(value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const sdate = new Date(createdDate);
  const ddate = new Date(dueDate);

  function getDaysBetweenDates(startDate, endDate) {
    // Ensure both dates are valid Date objects
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return null; // Handle invalid dates
    }

    const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in one day
    const differenceInMs = endDate.getTime() - startDate.getTime();

    // Math.floor rounds down to the nearest whole day
    return Math.floor(differenceInMs / oneDay);
  }

  var time = getDaysBetweenDates(sdate, ddate);

  // const currentDate = new Date().toISOString().split("T")[0];

  const handleAssign = (event) => {
    setTimeDuration(time);
    console.log(time);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      alert("Input the required fields");
    } else {
      event.preventDefault(); // Prevent default form submission
      // Form is valid, proceed with data submission
      const data = {
        TaskName: taskName,
        TaskDescription: description,
        Technology: technologies,
        Dependancy: dependancies,
        Priority: priority,
        TimeDuration: time,
        ProjectId: selectedId,
        DeveloperId: selectedDevId,
        CreatedDate: createdDate,
        DueDate: dueDate,
      };

      console.log(data);

      const url = "https://localhost:44339/api/TaskCreation";

      axios
        .post(url, data)
        .then((response) => {
          console.log("**");

          alert("Task created");
          console.log(response.data);

          setValidated(false);

          window.location.reload();
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }

    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleAssign}>
        <div className="Section">
          <h3 className="SectionHeading">Task Initialization</h3>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="taskName">Task Name:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  autoFocus
                  required
                  type="text"
                  style={{ color: "black", fontSize: "18px" }}

                  placeholder="Task Name"
                  id="taskName"
                  onChange={(e) => handleTNameChange(e.target.value)}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter task name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Task Description:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                placeholder="Enter task description"
                style={{ color: "black", fontSize: "18px" }}

                type="text"
                id="description"
                onChange={(e) => handleDescriptionChange(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter task description.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Technologies:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  placeholder="Enter technologies used"
                  style={{ color: "black", fontSize: "18px" }}

                  type="text"
                  id="technologies"
                  onChange={(e) => handleTechChange(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter task name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Row className="mb-3" style={{width:"70%"}}>
            <Form.Group as={Col}>
              <Form.Label>Created Date:</Form.Label>
              <TextField
                required
                style={{ backgroundColor: "whitesmoke", borderRadius: "10px", width:"300px"}}
                margin="dense"
                id="last_updated"
                type="date"
                fullWidth
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Due Date:</Form.Label>
              <TextField
                required
                style={{ backgroundColor: "whitesmoke", borderRadius: "10px", width:"300px"}}
                margin="dense"
                id="last_updated"
                type="date"
                fullWidth
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
          </Row>

            <Form.Group className="mb-3">
              <Form.Label>Dependancies:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  placeholder="Enter dependancies"
                  style={{ color: "black", fontSize: "18px" }}

                  type="text"
                  id="dependancies"
                  onChange={(e) => handleDependancyChange(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter task dependancies.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Priority:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                placeholder="Enter priority level"
                type="number"
                style={{ color: "black", fontSize: "18px" }}

                id="priority"
                onChange={(e) => handlePriorityChange(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter priority level.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

         
{/* 
          ----------------------File upload part-----------------------
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Upload:</Form.Label>
            <Form.Control type="file" size="sm" style={{ width: "250px" }} />
          </Form.Group> */}
        </div>

        <Button type="submit">Assign</Button>
      </Form>
    </div>
  );
}
