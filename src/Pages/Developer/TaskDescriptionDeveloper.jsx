import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import TaskDescription from '../../Components/Developer-Components/TaskDescription';
import TaskHeader from '../../Components/Developer-Components/TaskHeader';



export default function TaskDescriptionDeveloper() {
  return ( <div>
    <div className='DeveloperTask'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">

          
            <TaskHeader/>
            <TaskDescription/>

        </div>
    
    </div>
    </div>
  )
}
