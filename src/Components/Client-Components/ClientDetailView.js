import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/ClientDetailView.css';

const ClientDetailView = () => {
  const { clientId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://localhost:44339/api/Client/${clientId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Error fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [clientId]);

  const deactivateUser = async () => {
    const confirmDeactivation = window.confirm("Are you sure you want to deactivate the user?");
    if (!confirmDeactivation) {
      return;
    }

    try {
      await axios.post('https://localhost:44339/api/Client/deactivate-client', { clientId });
      alert("User deactivated successfully.");
      setErrorMessage(null);
      // Refetch the user data
      fetchUserData();
    } catch (error) {
      handleErrorResponse(error, 'deactivating');
    }
  };

  const reactivateUser = async () => {
    const confirmReactivation = window.confirm("Are you sure you want to reactivate the user?");
    if (!confirmReactivation) {
      return;
    }

    try {
      await axios.post('https://localhost:44339/api/Client/reactivate-client', { clientId });
      alert("User reactivated successfully.");
      setErrorMessage(null);
      // Refetch the user data
      fetchUserData();
    } catch (error) {
      handleErrorResponse(error, 'reactivating');
    }
  };

  const handleErrorResponse = (error, action) => {
    if (error.response && error.response.data && error.response.data.message) {
      setErrorMessage(error.response.data.message);
      window.alert(error.response.data.message);  // Display error message as a popup
    } else {
      const genericErrorMessage = `Error ${action} user.`;
      setErrorMessage(genericErrorMessage);
      window.alert(genericErrorMessage);  // Display generic error message as a popup
    }
    console.error(`Error ${action} user:`, error);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!userData) {
    return <div>User data not found.</div>;
  }

  return (
    <div className="profile-container">
      {/* Profile Icon */}
      <div className="profile-icon">
        <FontAwesomeIcon icon={faUser} size="5x" color="#000000" />
      </div>

      <div className="profile-details">
        <table className="user-details-table">
          <tbody>
            <tr>
              <td className="label"><strong>Client ID:</strong></td>
              <td className="value">{userData.clientId}</td>
            </tr>
            <tr>
              <td className="label"><strong>Username:</strong></td>
              <td className="value">{userData.userName}</td>
            </tr>
            <tr>
              <td className="label"><strong>Client FullName:</strong></td>
              <td className="value">{userData.clientName} {userData.lastName}</td>
            </tr>
            <tr>
              <td className="label"><strong>Email:</strong></td>
              <td className="value">{userData.email}</td>
            </tr>
            <tr>
              <td className="label"><strong>Mobile number:</strong></td>
              <td className="value">{userData.contactNumber}</td>
            </tr>
            <tr>
              <td className="label"><strong>Address:</strong></td>
              <td className="value">{userData.address}</td>
            </tr>
            <tr>
              <td className="label"><strong>NIC:</strong></td>
              <td className="value">{userData.nic}</td>
            </tr>
            <tr>
              <td className="label"><strong>Client Description:</strong></td>
              <td className="value">{userData.clientDescription}</td>
            </tr>
            <tr>
              <td className="label"><strong>Total payment:</strong></td>
              <td className="value">{userData.totalPayment}</td>
            </tr>
            <tr>
              <td className="label"><strong>IsActive:</strong></td>
              <td className="value">{userData.isActive ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bottom-buttons">
        <Link to="/clientList" className="btn btn-secondary">Back</Link>
        <button className="btn btn-danger" onClick={deactivateUser}>Deactivate</button>
        <button className="btn btn-success" onClick={reactivateUser}>Reactivate</button>
      </div>
    </div>
  );
};

export default ClientDetailView;
