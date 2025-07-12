
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/TaskStyle.css';
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';
import { getLoggedUserId } from '../../Auth/ApiService';

export default function Task() {
  const [taskData, setTaskData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const location = useLocation();
  const selectedTaskId = location.state.selectedTaskId;

  console.log("Taskid = " + selectedTaskId);

  const startTimer = async () => {
    if (!startTime) {
      const currentDateTime = new Date().toISOString();
      setStartTime(currentDateTime);
      console.log('Start Time:', currentDateTime);
      alert('Task marked as started!');

      const editDataNew = { TaskStartTime: currentDateTime };

      try {
        const urlTaskStatusStart = `https://localhost:44339/api/DeveloperTime/tasksStatusStart/${selectedTaskId}`;
        const responseTaskStatusStart = await axios.put(urlTaskStatusStart, editDataNew);
        console.log('Start time submitted:', editDataNew);
      } catch (error) {
        console.error('There was an error submitting the start time!', error);
        alert('An error occurred while submitting start time. Please check the console for details.');
      }
    } else {
      alert("Task already started. Please stop the timer before starting again.");
    }
  };

  const stopTimer = () => {
    if (startTime && !stopTime) { // Only allow stopping if started and not already stopped
      const currentDateTime = new Date().toISOString();
      setStopTime(currentDateTime);
      console.log('Stop Time:', currentDateTime);
      alert('Task marked as stopped!');
    } else {
      alert("Task not yet started or already stopped. You cannot stop the timer again.");
    }
  };

  const submit = async () => {
    if (!stopTime) {
      alert('Please stop the timer before submitting!');
      return; // Early exit if stopTime is not set
    }

    const editData = {
      TaskStartTime: startTime,
      TaskCompleteTime: stopTime,
    };

    try {
      const userid= getLoggedUserId();
      // DeveloperId == 5
      const url = `https://localhost:44339/api/DeveloperTime/taskTimes/${selectedTaskId}/${userid}`;
      const response = await axios.post(url, editData);

      const urlTask = `https://localhost:44339/api/DeveloperTime/tasks/${selectedTaskId}`;
      const responseTask = await axios.put(urlTask, editData);

      const newProject = `https://localhost:44339/api/DeveloperTime/projects/${selectedTaskId}`;
      const responseProject = await axios.put(newProject, editData);

      console.log(editData);
      alert('Data submitted successfully!');
      window.location.reload(); // Reload to refresh component state
    } catch (error) {
      console.error('There was an error editing the data!', error);
      alert('An error occurred while saving data. Please check the console for details.');
    }
  };
  const completed = async () => {
    const editData = {
      TaskStartTime: startTime,
      TaskCompleteTime: stopTime,
    };

    try {
      const urlTaskStatus = `https://localhost:44339/api/DeveloperTime/tasksStatusStop/${selectedTaskId}`;
      const responseTaskStatus = await axios.put(urlTaskStatus, editData);

      console.log(editData);
      alert('Task marked as completed!');
      // Consider alternative UI updates (e.g., disabling buttons, showing success message)
    } catch (error) {
      console.error('There was an error marking task as completed!', error);
      alert('An error occurred while marking task as completed. Please check the console for details.');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:44339/api/DeveloperTask/TaskDescription/${selectedTaskId}`);
        const data = await response.json();
        setTaskData(data);
        console.log(data);
        setIsLoading(false);

        setStartTime(null);
        setStopTime(null);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading Task details...</div>;
  }

  if (error) {
    return <div>Error fetching task details: {error.message}</div>;
  }



  return (
    <div>
    { taskData.map((item) => (
    <div className='Task'>
      
      <div className='Description'>
        <h2>Task : {item.taskName}</h2>
      </div>
      <div className='DueDate'>
      <h4>Task Due Date: {item.dueDate ? format(new Date(item.dueDate), 'yyyy-MM-dd') : '-'}</h4>
      </div>
      <div className='ButtonBox'>

        <div className="ButtonBoxUpper" style={{ display: 'flex' , gap: '20px' }}>

<h4>Start the time recorder for this task :</h4>
      <Button onClick={startTimer} variant="secondary" size="lg" >
      Start
        </Button>
    <br/>
    <br/>
    </div>
    <br/>
    <div className="ButtonBoxUpper" style={{ display: 'flex' , gap: '20px' }}>
    <h4>Stop the time recorder for this task:</h4>
    <Button onClick={stopTimer} variant="secondary" size="lg" >
    Stop
        </Button>
    <br/>
    <br/>

    </div>
    <br/>

<div className="ButtonBoxMiddle" style={{ display: 'flex' , gap: '20px' }}>
<h4>Submit your working hours:</h4>
    <Button onClick={submit} variant="primary" size="lg">
    Submit
        </Button>
    <br/>
    </div>
  
    </div>


    <div className="ButtonBoxBottom" style={{ display: 'flex' , gap: '10px' }}>
    <h4>Click here to mark the task as completed:</h4>
    <Button onClick={completed} variant="primary" size="lg" >
    Task Completed
        </Button>
    <br/>
    </div>

    </div>
  ))}
    </div>
  );
}