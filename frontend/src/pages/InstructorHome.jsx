// src/pages/InstructorHome.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddQuestion from "../components/AddQuestion";
import StudentReport from "../components/StudentReport";
import "./InstructorHome.css";

const InstructorHome = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <>
      <Navbar />
      <div className="instructor-home">
        <h1>Instructor Dashboard</h1>

        <div className="tab-buttons">
          <button
            className={activeTab === "add" ? "active" : ""}
            onClick={() => setActiveTab("add")}
          >
             Add Question
          </button>
          <button
            className={activeTab === "report" ? "active" : ""}
            onClick={() => setActiveTab("report")}
          >
             Student Reports
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "add" && <AddQuestion />}
          {activeTab === "report" && <StudentReport />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstructorHome;
