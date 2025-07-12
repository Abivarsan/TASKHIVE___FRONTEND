import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default function TeamDescription() {

    const [teamDetails, setTeamDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const selectedId = location.state.selectedId;
    const navigate = useNavigate();



  console.log(selectedId);

  const getData = async () => {
    try {
      const response = await axios.get(`https://localhost:44339/api/DeveloperTeam/TeamDescription/${selectedId}`);
      setTeamDetails(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };
useEffect(() => {
    getData();

  },[]);

  
  if (isLoading) {
    return <div>Loading Team details...</div>;
  }

  if (error) {
    // Handle errors gracefully, e.g., display an error message
    return <div>Error fetching Teanm details: {error.message}</div>;
  }
  return (
    
   
    <div>
      {isLoading && <p>Loading Teams...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Developers</th>
              
            </tr>
          </thead>
          <tbody>
            {teamDetails.map((item) => (
              <tr 
              key={item.userId}
              >
                <td>
                    Developer ID : {item.userId}<br/>
                    Developer Name : {item.developerName}<br/>
                    Developer Email : {item.email}<br/>
                    Developer Contact Number : {item.contactNumber}<br/>
            
                </td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}
