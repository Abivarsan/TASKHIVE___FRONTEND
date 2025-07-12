import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import SummaryHeader from '../../Components/Developer-Components/SummaryHeader';
import ModuleReport from '../../Components/Developer-Components/ModuleReport';
import './ReportPage.css'

function ProjectModuleReport() {
  return (
   
    <div>
    <div className='DeveloperProject'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">
           <SummaryHeader/>
           <div className='MainContent'>
           
 <ModuleReport/>
  
          </div>
      </div>
    
    </div>
    </div>
  )
}

export default ProjectModuleReport