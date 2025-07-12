import React, {  useEffect, useState } from "react";
import axios from "axios";



import emailjs from 'emailjs-com';
import { getLoggedUserId } from '../../Auth/ApiService';
import './Styles/ProjectCreationForm.css'


import TextField from "@mui/material/TextField";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import InputGroup from "react-bootstrap/InputGroup";

import "react-datepicker/dist/react-datepicker.css";
import "./Styles/datepickerStyle.css";


import "./Styles/FormStyle.css";

export default function ProjectCreationForm() {

  //const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  //const [projectManagerName, setProjectManagerName] = useState("");
  const [projectTeamName, setProjectTeamName] = useState("");
  const [projectManagerID, setProjectManagerID] = useState("");
  //const [clientName, setClientName] = useState("");
  const [clientID, setClientID] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [technologies, setTechnologies] = useState("");

  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  // const handlePIdChange = (value) => {
  //   setProjectId(value);
  // };


  const loggedAdminId = 1;
  



  //-------------get project manager'

  const [data, setData] = useState([]);

  const url = "https://localhost:44339/api/GetProjectManagerName";

  const getPmanager = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //------------get client names

  const [clients, setClients] = useState([]);

  const url2 = "https://localhost:44339/api/GetClientNames";
  const getClients = async () => {
    try {
      const response2 = await axios.get(url2);
      setClients(response2.data);
      console.log(response2.data);
    } catch (error) {
      console.log(error);
      console.log("==");
    }
  };

  useEffect(() => {
    getPmanager();
    getClients();
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

  // const handlePManagerNameChange = (value) => {
  //   setProjectManagerName(value);
  // };

  const handleTeamNameChange = (value) => {
    setProjectTeamName(value);
  };

  const handlePManagerIDChange = (event) => {
    setProjectManagerID(event.target.value);
    console.log(projectManagerID);
  };

  // const handleClientNameChange = (value) => {
  //   setClientName(value);
  // };

  const handleClientIDChange = (event) => {
    setClientID(event.target.value);
    console.log(clientID);
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

  const [validated, setValidated] = useState(false);

  //   const handleSubmit = (event) => {
  //     const form = event.currentTarget;
  //     if(form.checkValidity() === false) {
  //       event.preventDefault();
  //       event.stopPropagation();

  //     }

  //     setValidated(true);

  //     const data = {
  //       //ProjectId: projectId,
  //       ProjectName: projectName,
  //       ProjectDescription: description,
  //       Technologies: technologies,
  //       BudgetEstimation: budgetAllocation,
  //       StartDate: selectedStartDate,
  //       DueDate: selectedDueDate,
  //       Duration: timeDuration,
  //       Objectives: objectives,

  //       //ProjectStatus:
  //       TeamName: projectTeamName,
  //       ProjectManagerId: projectManagerID,
  //       //TaskCount
  //       ClientId: clientID,
  //       TimeLine: timeline
  //       //AdminId
  //     };

  //     const url = "https://localhost:44319/api/CreateProject";

  //     axios.post(url,data).then((e) =>{
  //       alert("data inserted");
  //       console.log(data);
  //     }

  //     ).catch((error)=>{
  //         console.log(data);
  //         alert(error);

  //       })
  // }

  //---------------------------------------------------------------------------------------

  const sdate = new Date(startDate);
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


  //email data

  const SendEmail = async () => {
    const urlEmail = `https://localhost:44339/api/EmailSend?adminId=${loggedAdminId}&PmId=${projectManagerID}&projectName=${projectName}`;
    if (window.confirm('Do you want to send a Email?')){
      axios.post(urlEmail, [])
    .then(alert("Email sent"))
    .catch(console.error());
    }
    
  }

  

  useEffect(() => {
    var time = getDaysBetweenDates(sdate, ddate);
    setTimeDuration(time);
  },[sdate, ddate])


  const handleSubmit = (event) => {

    const userid=getLoggedUserId();
    console.log(userid)

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      alert("Input the required fields");
    } else {
      event.preventDefault(); // Prevent default form submission
      // Form is valid, proceed with data submission
      const data = {
        //ProjectId: projectId,
        ProjectName: projectName,
        ProjectDescription: description,
        Technologies: technologies,
        BudgetEstimation: budgetAllocation,
        P_StartDate: startDate,
        P_DueDate: dueDate,
        Duration: timeDuration,
        Objectives: objectives,

        //ProjectStatus:
        TeamName: projectTeamName,
        ProjectManagerId: projectManagerID,
        //TaskCount
        ClientId: clientID,
        TimeLine: timeline,
        //AdminId
      };
   
      console.log(data);

      const url = `https://localhost:44339/api/CreateProject?id=${userid}`;

      axios
        .post(url, data)
        .then((response) => {
          alert("Data inserted successfully");
          console.log("**");
          console.log(response.data);

          //---after successful submission

          //Email sending part
          SendEmail();

          setValidated(false);
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
        });


        
    }
    // //Email send part
    // emailjs.sendForm(
    //   'service_ycu89qk',
    //   'template_72pp792',
    //   formData,
    //   'GFEPTZpFNfrSjkjsD'
    // )
    //   .then((response) => {
    //     console.log('SUCCESS!', response.status, response.text);
    //     alert('Email sent successfully!');
    //     setFormData({ name: '', email: '', message: '' }); // Clear form after submission
    //   })
    //   .catch((err) => {
    //     console.log('FAILED...', err);
    //     alert('Email sending failed! Please try again later.');
    //   });

    // const templateParams = {
    //   UserName: 'UserName',
    //   userName: 'abc',
    //   adminName: 'abcd',
    //   reply_to:'surajmshan@gmail.com'
    // };

    // emailjs
    //   .send("service_ycu89qk", "template_72pp792", templateParams, "GFEPTZpFNfrSjkjsD")
    //   .then((response) => {
    //     console.log("SUCCESS!", response.status, response.text);
    //     alert("Email sent successfully!");
        
    //   })
    //   .catch((error) => {
    //     console.error("FAILED...", error);
    //     alert("Failed to send email. Please try again later.");
    //   });
  

    

    setValidated(true); // Always set validated to true after attempting validation
  };


  return (
    
    <div className="content-project">
    
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* ------Project Initalization part----- has a validation */}

        <div className="Section-project">
          <h3 className="SectionHeading">Project Initialization</h3> 
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="projectName">Project Name:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  autoFocus
                  required
                  type="text"
                  placeholder="ProjectName"
                  id="projectName"
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
              placeholder="Enter project description"
              id="description"
              style={{ color: "black", fontSize: "18px" }}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Objectives:</Form.Label>
            <Form.Control
              placeholder="Enter project objectives"
              id="objectives"
              style={{ color: "black", fontSize: "18px" }}
              onChange={(e) => handleObjectiveChange(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Technologies</Form.Label>
            <Form.Control
              type="text"
              style={{ color: "black", fontSize: "18px" }}
              placeholder="Enter technologies"
              id="technologies"
              onChange={(e) => handleTechnologyChange(e.target.value)}
            />
          </Form.Group>

         
        </div>

        {/* -----------Develpment team info---------- has a validation */}

        <div className="Section-project">
          <h3 className="SectionHeading">Development Team Information</h3>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Project Manager: </Form.Label>
                <br />
                <InputGroup hasValidation>
                  <select
                    required
                    id="SelectPmanager"
                    className="Managerlist"
                    value={projectManagerID}
                    onChange={handlePManagerIDChange}
                  >
                    <option
                      value=""
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                      }}
                    >
                      Select Project Manager
                    </option>
                    {data.map((val) => (
                      <option key={val.userId} value={val.userId}>
                        {val.userId}... {val.firstName} {val.lastName}
                      </option>
                    ))}
                  </select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please select project manager.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col}></Form.Group>
              <br />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Project Team Name:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter project team name"
                  id="projectTeamName"
                  style={{ color: "black", fontSize: "18px" }}
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

        {/* -----------Client info---------- has a validation */}

        <div className="Section-project">
          <h3 className="SectionHeading">Client Information</h3>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Client: </Form.Label>
                <br />
                <InputGroup hasValidation>
                  <select
                    required
                    id="SelectClient"
                    className="Clientlist"
                    value={clientID}
                    onChange={handleClientIDChange}
                  >
                    <option
                      value=""
                      style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                      }}
                    >
                      Select Client...
                    </option>
                    {clients.map((val) => (
                      <option key={val.clientId} value={val.clientId}>
                        {val.clientId}... {val.clientName}
                      </option>
                    ))}
                  </select>

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter client ID.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Group>
          </Row>
        </div>

        {/* --------------Dates--------- */}

        <div className="Section-project">
          <h3 className="SectionHeading">Project Planing</h3>
          <Row className="mb-3">
  <Form.Group as={Col} md={6}>
    <Form.Label>Start Date:</Form.Label>
    <InputGroup hasValidation>
      <TextField
        aria-required
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: "10px",
          width: "100%" // Use 100% to ensure it fits the column
        }}
        margin="dense"
        id="startDate"
        type="date"
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Please select a start date.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group>

  <Form.Group as={Col} md={6}>
    <Form.Label>Due Date:</Form.Label>
    <InputGroup hasValidation>
      <TextField
        aria-required
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: "10px",
          width: "100%" // Use 100% to ensure it fits the column
        }}
        margin="dense"
        id="dueDate"
        type="date"
        fullWidth
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Please select a due date.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group>
</Row>


          <Form.Group className="mb-3">
            <Form.Label>Project Time Line</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              id="timeline"
              style={{ color: "black", fontSize: "18px" }}
              onChange={(e) => handleTimelineChange(e.target.value)}
            />
          </Form.Group>

          
        </div>

        <div className="Section-project">
          <Form.Group className="mb-3">
          <h3 className="SectionHeading">Budget Allocation</h3>
            <Form.Label >Budget Allocation</Form.Label>
            <Form.Control
              type="text"
              style={{ color: "black", fontSize: "18px" }}
              placeholder="Enter budget allocation"
              id="budgetAllocation"
              onChange={(e) => handleBudgetChange(e.target.value)}
            />
          </Form.Group>
    
        </div>

       

        

        <Button type="submit">Submit form</Button>
      </Form>
      
      

    </div>
  );
}
