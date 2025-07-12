import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/ProjectListCSS.css";
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";


export default function ProjectListComponent() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();


  const url = "http://localhost:5228/api/ViewProjectList";    //new

  useEffect(() => {
    axios
      .get(url)
      .then((result) => setData(result.data))
      .catch((e) => console.log(e));

      setLoad(false);
  }, []);

 
  var selectedId;

  const HandleProjectSelection = (id) => {
    selectedId = id;
  //  alert(selectedId);
    
    
     
    navigate('/AdminProjectViewPage',{state:{selectedId:selectedId}});
    
   
    
  };

  if(load){
    return(
      <>
        <Spinner size="lg" animation="border" style={{marginLeft: "75px", marginTop: "35px"}} />
      </>
    );
  }
  

  return (
    <div>
      <table className="ProjectList">
        <thead>
          <th>Project Id</th>
          <th>Project Name</th>
          <th>Project Status</th>
        </thead>
        
        <tbody>
        
          {(data.length === 0) ? (
            <Spinner size="lg" animation="border" style={{marginLeft: "75px", marginTop: "35px", marginBottom: "35px"}} />
          ): <></>}
        
          {data.map((project, index) => (
            <tr
              key={project.proId}
              onClick={() => HandleProjectSelection(project.proId)}
              
            >
              <td>{project.proId}</td>
              <td>{project.projectName}</td>
              <td>{project.projectStatus}</td>

              
            </tr>
          ))}
          
        </tbody>
        
      </table>
      
    </div>
  );
}
