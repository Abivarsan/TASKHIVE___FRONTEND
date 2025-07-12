import './Styles/TaskDescription.css'
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';


export default function TaskDescription() {

 
    const [taskDetails, setTaskDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const selectedId = location.state.selectedId;
    const navigate = useNavigate();



  console.log(selectedId);

  const getData = async () => {
    try {
      const response = await axios.get(`https://localhost:44339/api/DeveloperTask/TaskDescription/${selectedId}`);
      setTaskDetails(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };
useEffect(() => {
    getData();

  },[]);

  
  if (isLoading) {
    return <div>Loading Task details...</div>;
  }

  if (error) {
    // Handle errors gracefully, e.g., display an error message
    return <div>Error fetching Task details: {error.message}</div>;
  }

  return (

    <div>
    { taskDetails.map((item) => (

    <div className='TaskDescription'>
      <h2>{item.taskName}</h2>
      <h5>Project Details:</h5>
      <div className='TaskProjectdetails'>
      <p>Project Name: {item.projectName}</p>
      <p>Project Id: {item.projectId}</p>
      </div>
      <h5>Task Details:</h5>
      <div className='Taskdetails'>
      <p>Task Name: {item.taskName}</p>
      <p>Task Id: {item.taskId}</p>
      <p>Task Status: {item.taskStatus}</p>
      <p>Description: {item.taskDescription}</p>
      <p>Priority: {item.priority}</p>
      <p>Technology: {item.technology}</p>
      <p>Dependancy: {item.dependancy}</p>
      </div>
      <h5>Time Information:</h5>
      <div className='Taskdetails'>
      <p>Start Date: {item.createdDate? format(new Date(item.createdDate), 'yyyy-MM-dd') : '-'}</p>
      <p>Time Estimation: {item.timeDuration} </p>
      <p>Due Date: {item.dueDate ? format(new Date(item.dueDate ), 'yyyy-MM-dd') : '-'}</p>
      </div>
    </div>
  
  ))}

</div>

);
}
