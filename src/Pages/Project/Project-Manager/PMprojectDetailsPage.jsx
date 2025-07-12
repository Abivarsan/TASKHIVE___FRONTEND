import React from 'react'
import Topbar from '../../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import PMprojectDetailsCom from '../../../Components/Project-Components/Project-Manger-Components/PMprojectDetailsCom'

export default function PMprojectDetailsPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
            
            <h2>Project Details</h2>
            
            <div>
              {/* content */}
              <PMprojectDetailsCom />
             
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
