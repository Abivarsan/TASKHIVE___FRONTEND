import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { getLoggedUserId } from '../../Auth/ApiService';

function Projectlist() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const userid=getLoggedUserId();
    const fetchData = async () => {
      try {
        //DeveloperId == 5
        const response = await axios.get(`https://localhost:44339/api/DeveloperProject/${userid}`);
        setProjects(response.data);
        console.log(projects);
      } catch (error){
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


  const ProjectSelection = (id) => {
    selectedId = id;
    navigate('/ProjectDescriptionDeveloper',{state:{selectedId:selectedId}});
  };

  return (
    <div>
      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Project Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr 
              key={project.projectId}
              onClick = {() =>ProjectSelection(project.projectId)}
              >
                <td>{project.projectId}</td>
                <td>{project.projectName}</td>
                <td>{project.projectStatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );


}
  
export default Projectlist