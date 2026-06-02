import { useState } from "react";
import axiosInstance from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("users/login/", formData);
      if (response.data.role !== "ADMIN") {
        alert("Only admins can login here");
        setLoading(false);
        return;
      }
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);
      alert("Login successful");
      if(localStorage.getItem("role")!=="ADMIN"){
        return <Navigate to="/login" />;
      }
      navigate("/admin/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handlechange}
          className="w-full border p-3 bounded-lg mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlechange}
          className="w-full border p-3 bounded-lg mb-4"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
