import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div onClick={() => navigate("/")} className="navbar-left">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="brand-name">FlexiLearn</h1>
      </div>

      <div className="navbar-right">
        {!user ? (
          <button onClick={() => navigate("/login")} className="nav-btn ">
            Login
          </button>
        ) : (
          <>
            <button
            //   onClick={() => navigate("/profile")}
              className="nav-btn "
            >
              Profile
            </button>
            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
