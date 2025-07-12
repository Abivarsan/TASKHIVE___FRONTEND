import React from 'react'
import Topbar from '../../Components/Common-Components/Topbar';
import DeveloperSidebar from '../../Components/Developer-Components/DeveloperSidebar';
import TeamHeader from '../../Components/Developer-Components/TeamHeader';
import TeamDescription from '../../Components/Developer-Components/TeamDescription';

export default function TeamDescriptionDeveloper() {
  return (<div>
    <div className='DeveloperTeam'>
    
      <Topbar />
      <DeveloperSidebar/>

      <div className="Content">

      <TeamHeader/>
          
            <TeamDescription/>

        </div>
    
    </div>
    </div>
  )
}
