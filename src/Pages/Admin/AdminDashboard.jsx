import React, { useState } from 'react'
import Sidebar from '../../Components/Common-Components/Sidebar.jsx'
import Topbar from '../../Components/Common-Components/Topbar.jsx'
import '../Styles/PageStructure.css'
import AdminDashboardComponent from '../../Components/Admin-Components/AdminDashboardComponent.js'
import { useLocation } from 'react-router-dom'


function AdminDashboard() {





  return (
    <div className="FullPage">
      
      <Sidebar/>
      <Topbar/>
     
      <div className="Content">
       
        <AdminDashboardComponent showRateUpdate={true}/>
     
      </div>
      
    </div>

  )
}

export default AdminDashboard