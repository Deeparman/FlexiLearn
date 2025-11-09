import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";


const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        if (res.data.user.role === "instructor") navigate("/instructor");
        else navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
  <div className="login-card">
    <h2>Login</h2>
    <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="uid"
            placeholder="UID / Roll Number"
            value={formData.uid}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-3 text-gray-600">{message}</p>
        )}

        <p className="message">
          Don’t have an account?{" "}
          <span
            className="register-text"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
