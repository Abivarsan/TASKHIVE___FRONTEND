import React from "react";
import Topbar from "../../Components/Common-Components/Topbar";
import Sidebar from "../../Components/Common-Components/Sidebar";
import '../../Pages/Styles/PageStructure.css'
import ProjectCreationForm from "../../Components/Project-Components/ProjectCreationForm";


export default function ProjectCreation() {
  return (
    <div>
      <div className="FullPage">
        
        <Topbar />
        <Sidebar />
        <div className="Content">
            <h1>Project Creation</h1><br/>
            <ProjectCreationForm/>
            <div>
              
            </div>
            
        </div>
        
      </div>
    </div>
  );
}
