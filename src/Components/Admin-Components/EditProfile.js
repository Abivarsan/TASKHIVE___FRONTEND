import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EditProfileComponent.css';
import { getLoggedUserId } from '../../Auth/ApiService';
import apiRequest from '../../Auth/ApiService';

const EditProfileComponent = () => {
  const navigate = useNavigate();
  let userId;
  try {
    userId = getLoggedUserId();
  } catch (error) {
    console.error('Error getting logged user ID:', error);
  }

  const [userData, setUserData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    gender: '',
    nic: '',
    dob: '',
    userCategoryType: '',
    jobRoleType: '',
    imageSrc: ''
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error('No user ID available');
        setErrorMessage('No user ID available');
        setLoading(false);
        return;
      }
      try {
        const response = await apiRequest(`http://localhost:5228/api/User/${userId}`);
        console.log('Fetched User Data:', response);
        
        // Format dob if needed
        const formattedDob = response.dob ? new Date(response.dob).toISOString().split('T')[0] : '';
        
        setUserData({
          ...response,
          dob: formattedDob
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setErrorMessage('Error fetching user data');
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUserData({ ...userData, imageSrc: URL.createObjectURL(file) });
  };

  

  const handleSaveChanges = async () => {
    if (!selectedFile) {
      alert('Please select a profile image before saving changes.');
      return; 
    }
    try {
      const formData = new FormData();
      formData.append('email', userData.email);
      formData.append('contactNumber', userData.contactNumber);
      formData.append('address', userData.address);
      if (selectedFile) {
        formData.append('imageFile', selectedFile);
      }

      await apiRequest(`http://localhost:5228/api/User/update/${userId}`, 'PUT', formData);

      alert('Profile updated successfully.');
      window.location.reload();
      navigate(`/editProfile/${userId}`, { state: { isEditMode: false } });
    } catch (error) {
      setErrorMessage('Error updating profile.');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="userName"
            value={userData.userName}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="form-control"
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="contactNumber"
            value={userData.contactNumber}
            onChange={handleInputChange}
            className="form-control"
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            className="form-control"
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={userData.gender}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>NIC</label>
          <input
            type="text"
            name="nic"
            value={userData.nic}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={userData.dob}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>User Category</label>
          <input
            type="text"
            name="userCategoryType"
            value={userData.userCategoryType}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Job Role</label>
          <input
            type="text"
            name="jobRoleType"
            value={userData.jobRoleType}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Profile Photo</label>
          <img src={userData.imageSrc} alt="Profile" className="profile-image" />
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            className="form-control"
            disabled={!isEditing}
          />
        </div>
        <div className="form-buttons">
          {isEditing ? (
            <>
              
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
            </>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfileComponent;
