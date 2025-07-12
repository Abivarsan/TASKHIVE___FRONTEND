import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../Auth/AuthContext'; // Import the useAuth hook

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from the context

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      UserName: username,
      Password: password
    };

    try {
      //const response = await axios.post('https://localhost:7008/api/Auth/login', data);
      const response = await axios.post('http://localhost:5228/api/Auth/login', data);
      const { accessToken, refreshToken } = response.data; // Assuming your backend returns these fields
      localStorage.setItem('accessToken', accessToken); // Store the access token securely
      localStorage.setItem('refreshToken', refreshToken); // Store the refresh token securely

      // Decode the token to extract user's role
      const decodedToken = jwtDecode(accessToken);
      console.log('Decoded Token:', decodedToken); // Log the decoded token for debugging

      const userCategoryId = decodedToken['UserCategoryId'];
      console.log('UserCategoryId:', userCategoryId); 

      const userId = decodedToken['UserID'];
      console.log("userId: ", userId);

      

      // Call the login function from the context
      login({
        userId: decodedToken['UserID'],
        userName: decodedToken['UserName'],
        userCategoryId: userCategoryId,
        accessToken: accessToken,
        refreshToken: refreshToken
      });

      // Redirect based on user's role
      switch (userCategoryId) {
        case '1':
          navigate('/adminDashboard',{state: {userId}});
          break;
        case '2':
          navigate('/ProjectManagerDashboard',{state: {userId}});
          break;
        case '3':
          navigate('/developerDashboard',{state: {userId}});
          break;
        case '4':
          navigate('/clientDashboard',{state: {userId}});
          break;
        default:
          navigate('/');
          break;
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error('Login failed:', error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className='wrapper1'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={handleUsernameChange}
              required 
            />
            <FaUser className='icon' />
          </div>

          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={handlePasswordChange}
              required 
            />
            <FaLock className='icon' />
          </div>

          <button type="submit">Login</button>

          <div className="remember-forgot">
            <a href="/forgotPassword">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
