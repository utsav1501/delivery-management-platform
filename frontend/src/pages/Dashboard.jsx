import React from "react";
import { useEffect } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import CustomerDashboard from "../components/CustomerDashboard";
import DriverDashboard from "../components/DriverDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome {username}</h2>
      {role === "CUSTOMER" ? <CustomerDashboard /> : <DriverDashboard />}
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
