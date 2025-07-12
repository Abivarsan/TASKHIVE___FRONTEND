import React from 'react'
import './Styles/Header.css'
import DeveloperPayment from '../../Pages/Finance/DeveloperPayment'


function Header() {
    return (
<div className="header">
  <dev><h1>Dashboard</h1></dev>
            
            <div className='header-right'>
            
            </div>
            <div className="developerpayment">
               <DeveloperPayment/>  
                 </div> 
            
            </div>
    )
}

export default Header