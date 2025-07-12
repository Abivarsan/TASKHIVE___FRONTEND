import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SearchBar from "../../Components/Common-Components/Searchbar.jsx"; // Ensure the import path is correct
import apiRequest from '../../Auth/ApiService.js'; // Ensure the import path is correct

export default function ClientListComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    try {
      const result = await apiRequest("https://localhost:44339/api/Client/list");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelection = (id) => {
    console.log(`Navigating to: /clientProfilePage/${id}`);
    navigate(`/clientProfilePage/${id}`);
  };

  const handleAddUser = () => {
    navigate('/clientCreation');
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      fetchData(); // If search term is empty, fetch all data
    } else {
      try {
        const result = await apiRequest(`https://localhost:44339/api/Client/search?term=${searchTerm}`);
        setData(result);
      } catch (error) {
        console.error("Error searching data:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>Client List</h2>
        <button 
          style={{ backgroundColor: '#325472', borderColor: 'black' }} 
          className="btn btn-primary" 
          onClick={handleAddUser}
        >
          + Add New Client
        </button>
      </div>
      
      <SearchBar onSearch={handleSearch} />

      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Client Id</th>
            <th>User Name</th>
            <th>Full Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} onClick={() => handleUserSelection(user.clientId)}>
              <td>{user.clientId}</td>
              <td>{user.userName}</td>
              <td>{user.clientName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
