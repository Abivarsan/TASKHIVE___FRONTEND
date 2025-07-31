import React, { useState, useEffect } from "react";
import './Styles/Profile.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getLoggedUserId } from '../../Auth/ApiService.js';
import { handleLogout as logoutUser } from './Logout.jsx';
import { useAuth } from '../../Auth/AuthContext.js';

export default function Profile() {
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

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileVisibility = () => {
    navigate(`/editProfile/${userId}`);
    setIsProfileOpen(false);
  };

  const handleChangePassword = () => {
    navigate('/resetpassword');
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logoutUser(navigate, logout);
    setIsProfileOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`profile ${isProfileOpen ? 'open' : ''}`} onClick={toggleProfile}>
      {profilePhoto || imageSrc ? (
        <img
          src={imageSrc || profilePhoto}
          alt="Profile"
          className="profile-photo"
        />
      ) : (
        <div className="profile-photo-placeholder">
          {userName ? getInitials(userName) : 'U'}
        </div>
      )}
      
      <span className="profile-name">
        {userName || 'User'}
      </span>

      {isProfileOpen && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-info">
            {profilePhoto || imageSrc ? (
              <img
                src={imageSrc || profilePhoto}
                alt="Profile"
                className="profile-dropdown-photo"
              />
            ) : (
              <div className="profile-dropdown-photo-placeholder">
                {userName ? getInitials(userName) : 'U'}
              </div>
            )}
            <div className="profile-dropdown-name">{userName || 'User Name'}</div>
            <div className="profile-dropdown-email">{email || 'user@example.com'}</div>
          </div>

          <button className="edit-profile" onClick={handleProfileVisibility}>
            Edit Profile
          </button>
          
          <button className="change-password" onClick={handleChangePassword}>
            Change Password
          </button>
          
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
