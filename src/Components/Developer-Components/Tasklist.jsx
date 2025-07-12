import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Import date-fns for formatting
import Button from 'react-bootstrap/Button';
import { getLoggedUserId } from '../../Auth/ApiService';


function Tasklist() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userid= getLoggedUserId();
    const fetchData = async () => {
      try {
        // DeveloperID == 5 (replace with appropriate logic)
        const response = await axios.get(`http://localhost:5228/api/DeveloperTask/GetAllTasks/${userid}`);
        setTasks(response.data);
        console.log(tasks.dueDate);
      } catch (error) {
        setError(error);
        alert(error);
        console.log("Error occured: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  var selectedId;



  const TaskSelection = (id) => {
    selectedId = id;
    navigate('/TaskDescriptionDeveloper',{state:{selectedId:selectedId}});
  };

  const handleTaskSelectionNew = (taskId) => {
    navigate('/TaskRecord', { state: { selectedTaskId: taskId } });
  };

  return (
    <div>
      {loading && <p>Loading tasks...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Task Duedate</th>
              <th>Task Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.taskId}>
                <td
                 key={task.taskId}
                 onClick = {() =>TaskSelection(task.taskId)}>{task.taskId}</td>
                <td 
                key={task.taskId}
              onClick = {() =>TaskSelection(task.taskId)}>{task.taskName}</td>
                <td
                 key={task.taskId}
                 onClick = {() =>TaskSelection(task.taskId)}>
                  {task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '-'}
                </td>
                <td>
                <Button 
                    onClick={() => handleTaskSelectionNew(task.taskId)}
                    disabled={task.taskStatus === 3}
                    variant="primary" size="sm" 
                  >
                    {task.taskStatus === 1
                      ? 'To Do'
                      : task.taskStatus === 2
                        ? 'In Progress'
                        : 'Done'}
                    </Button>
      
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tasklist;







