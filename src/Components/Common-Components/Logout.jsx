// Logout.jsx
import React from "react";
import "./Styles/Logoutstyle.css";
import { useNavigate } from "react-router-dom";
import apiRequest from '../../Auth/ApiService'; 
import { useAuth } from '../../Auth/AuthContext';

export const handleLogout = async (navigate, logout) => {
  if (window.confirm("Do you want to log out?")) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await apiRequest("http://localhost:5228/api/Auth/logout", "POST", { refreshToken });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      logout();
      navigate("/loginForm");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Logout failed: Access token expired or invalid");
        alert("Your session has expired. Please log in again.");
        navigate("/loginForm");
      } else {
        console.error("Logout failed:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  }
};

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="logout">
      <i className="bi bi-box-arrow-right"></i>
      <input
        type="button"
        value="Log Out"
        className="logoutbutton"
        onClick={() => handleLogout(navigate, logout)}
      />
    </div>
  );
}
