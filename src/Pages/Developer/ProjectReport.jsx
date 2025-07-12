import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import SummaryHeader from '../../Components/Developer-Components/SummaryHeader';
import TimeReport from '../../Components/Developer-Components/TimeReport';
import './ReportPage.css'


export default function ProjectReport() {
  return (
    <div>
    <div className='DeveloperProject'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">
           <SummaryHeader/>
           <div className='MainContent'>
           
  <TimeReport />
  
          </div>
      </div>
    
    </div>
    </div>
  )
}
