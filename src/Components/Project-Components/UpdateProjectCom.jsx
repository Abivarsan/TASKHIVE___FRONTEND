import React, { useEffect, useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

import "react-datepicker/dist/react-datepicker.css";
import "./Styles/datepickerStyle.css";

import "./Styles/FormStyle.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateProjectCom() {
  const [oldData, setOldData] = useState([]);
  const location = useLocation();
  const proId = location.state.selectedId;

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [projectTeamName, setProjectTeamName] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const GetOldData = async () => {
    const url = `https://localhost:44339/api/CreateProject/GetDetails?ProId=${proId}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      setOldData(data);

      // Set initial form values
      if (data.length > 0) {
        const project = data[0];
        setProjectName(project.projectName);
        setDescription(project.projectDescription);
        setObjectives(project.objectives);
        setProjectTeamName(project.teamName);
        setTimeline(project.timeline);
        setBudgetAllocation(project.budgetEstimation);
        setTechnologies(project.technologies);
        setStartDate(project.p_StartDate.split("T")[0]);
        setDueDate(project.p_DueDate.split("T")[0]);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    GetOldData();
  }, []);

  const handlePNameChange = (value) => {
    setProjectName(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleObjectiveChange = (value) => {
    setObjectives(value);
  };

  const handleTeamNameChange = (value) => {
    setProjectTeamName(value);
  };

  const handleTimelineChange = (value) => {
    setTimeline(value);
  };

  const handleBudgetChange = (value) => {
    setBudgetAllocation(value);
  };

  const handleTechnologyChange = (value) => {
    setTechnologies(value);
  };

  function getDaysBetweenDates(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return null;
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInMs = endDate.getTime() - startDate.getTime();

    return Math.floor(differenceInMs / oneDay);
  }

  useEffect(() => {
    if (startDate && dueDate) {
      const time = getDaysBetweenDates(new Date(startDate), new Date(dueDate));
      setTimeDuration(time);
    }
  }, [startDate, dueDate]);

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      alert("Input the required fields");
    } else {
      event.preventDefault();
      const data = {
        ProjectName: projectName,
        ProjectDescription: description,
        Technologies: technologies,
        BudgetEstimation: budgetAllocation,
        P_StartDate: startDate,
        P_DueDate: dueDate,
        Duration: timeDuration,
        Objectives: objectives,
        TeamName: projectTeamName,
        TimeLine: timeline,
        ClientID: 0,
        ProjectManagerId: 0
      };

      const url = `https://localhost:44339/api/CreateProject/${proId}`;

      axios
        .put(url, data)
        .then((response) => {
          alert("Project updated successfully");
          setValidated(false);
          navigate(-1);
        })
        .catch((error) => {
          alert(error);
        });
    }

    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="Section">
          <h3 className="SectionHeading">Project Initialization</h3>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="projectName">Project Name:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  autoFocus
                  required
                  type="text"
                  className="formField"
                  id="projectName"
                  value={projectName}
                  style={{ color: "black", fontSize: "18px" }}
                  onChange={(e) => handlePNameChange(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter project name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Project Description:</Form.Label>
            <Form.Control
              id="description"
              style={{ color: "black", fontSize: "18px" }}
              className="formField"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Objectives:</Form.Label>
            <Form.Control
              id="objectives"
              value={objectives}
              onChange={(e) => handleObjectiveChange(e.target.value)}
              style={{ color: "black", fontSize: "18px" }}

            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Technologies</Form.Label>
            <Form.Control
              type="text"
              className="formField"
              style={{ color: "black", fontSize: "18px" }}

              id="technologies"
              value={technologies}
              onChange={(e) => handleTechnologyChange(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="Section">
          <h3 className="SectionHeading">Development Team Information</h3>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Project Team Name:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  required
                  className="formField"
                  id="projectTeamName"
                  style={{ color: "black", fontSize: "18px" }}
                  value={projectTeamName}
                  onChange={(e) => handleTeamNameChange(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter team name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
        </div>

        <div className="Section">
          <h2 className="SectionHeading">Project Planning</h2>
          <Row className="mb-3" style={{ width: "65%" }}>
            <Form.Group as={Col}>
              <Form.Label>Start Date:</Form.Label>
              <InputGroup hasValidation>
                <TextField
                  aria-required
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "10px",
                    width: "300px"
                  }}
                  margin="dense"
                  id="last_updated"
                  type="date"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please select start date.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Due Date:</Form.Label>
              <TextField
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: "10px",
                  width: "300px"
                }}
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
            <Form.Label>Project Time Line</Form.Label>
            <Form.Control
              type="text"
              id="timeline"
              style={{ color: "black", fontSize: "18px" }}
              value={timeline}
              onChange={(e) => handleTimelineChange(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="Section">
          <Form.Group className="mb-3">
            <Form.Label>Budget Allocation</Form.Label>
            <Form.Control
              type="text"
              style={{ color: "black", fontSize: "18px" }}
              id="budgetAllocation"

              value={budgetAllocation}
              onChange={(e) => handleBudgetChange(e.target.value)}
            />
          </Form.Group>
        </div>

        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
}
