import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import ProjectHeader from '../../Components/Developer-Components/ProjectHeader';
import ProjectDescription from '../../Components/Developer-Components/ProjectDescription';




export default function ProjectDescriptionDeveloper() {


  return ( <div>
    <div className='DeveloperProject'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">

            <ProjectHeader/>
          
            <ProjectDescription/>

        </div>
    
    </div>
    </div>
  )
}
