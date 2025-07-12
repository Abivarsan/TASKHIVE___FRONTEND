import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import ResourceHeader from '../../Components/Developer-Components/ResourceHeader';
import ProjectFileView from '../../Components/Developer-Components/ProjectFileView';

export default function ProjectFileViewPage() {
  return (
    
    <div>
    <div className='DeveloperProject'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">
           <ResourceHeader/>
           <div className='MainContent'>
           
  <ProjectFileView/>
  
          </div>
      </div>
    
    </div>
    </div>
  )
}
