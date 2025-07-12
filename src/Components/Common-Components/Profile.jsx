import React, { useState, useEffect } from "react";
import './Styles/Profile.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getLoggedUserId } from '../../Auth/ApiService.js'; 
import { handleLogout as logoutUser } from './Logout.jsx'; 
import { useAuth } from '../../Auth/AuthContext.js'; 

export default function TopBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth(); 
  const userId = getLoggedUserId();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5228/api/User/${userId}`);
        setUserName(response.data.userName);
        setUserEmail(response.data.email);
        setProfilePhoto(response.data.profilePhoto);
        setImageSrc(response.data.imageSrc);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileVisibility = () => {
    navigate(`/editProfile/${userId}`);
  };

  const handleChangePassword = () => {
    navigate('/resetpassword');
  };

  return (
    <div className="top-bar">
      <span className="profile-name">{userName}</span>
      <div className="profile" onClick={toggleProfile}>
        {imageSrc ? (
          <img src={imageSrc} alt="Profile" className="profile-photo" />
        ) : (
          <div className="profile-photo-placeholder"></div>
        )}
        {isProfileOpen && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-info">
              {imageSrc ? (
                <img src={imageSrc} alt="Profile" className="profile-dropdown-photo" />
              ) : (
                <div className="profile-photo-placeholder"></div>
              )} <br/>
              <span className="profile-dropdown-email">{email}</span><br/>
              <span className="profile-dropdown-name">{userName}</span>
            </div>
            <button onClick={handleProfileVisibility}>Edit Profile</button>
            <button onClick={handleChangePassword}>Change Password</button>
            <button onClick={() => logoutUser(navigate, logout)}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
