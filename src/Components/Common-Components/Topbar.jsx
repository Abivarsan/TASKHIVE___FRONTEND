import React from 'react'
import "./Styles/Topbarstyle.css";
import SearchBar from './Searchbar';
import Profile from './Profile';




export default function Topbar() {
  return (
    <div className="topbar">
        <span className='appname'><b>PROXIMA</b></span>
        <span className='topbaritems'>        
        <span className='profile'> <Profile/></span> 
        </span>
        
    </div>
  )
}
