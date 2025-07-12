import React from 'react'
import Topbar from '../../../Components/Common-Components/Topbar'
import ProjectManagerSidebar from '../../../Components/Project-Components/ProjectManagerSidebar'
import PMprojectListCom from '../../../Components/Project-Components/Project-Manger-Components/PMprojectListCom'


export default function PMprojectListPage() {
  return (
    <div>
        <div className="FullPage">
        
        <Topbar />
        <ProjectManagerSidebar />
        <div className="Content">
            
            <h2>Project List</h2>
            
            <div>
              {/* content */}
              <PMprojectListCom />
             
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
