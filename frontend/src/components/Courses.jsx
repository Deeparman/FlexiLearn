import React from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const Courses = () => {
  const navigate = useNavigate();

  const courses = [
    {
      name: "Computer Networks (CN)",
      code: "CN",
      description: "Understand the fundamentals of data communication, routing, and network layers.",
    },
    {
      name: "Operating Systems (OS)",
      code: "OS",
      description: "Dive into process management, memory handling, and file systems with OS concepts.",
    },
    {
      name: "MERN Stack",
      code: "MERN",
      description: "Build full-stack web applications using MongoDB, Express, React, and Node.js.",
    },
  ];

  const handleStart = (code) => {
    navigate(`/course/${code}`);
  };

  return (
    <div className="courses-section">
      <h2 className="courses-heading">Available Courses</h2>
      <div className="course-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h3 className="course-titles">{course.name}</h3>
            <p className="course-description">{course.description}</p>
            <button className="course-btn" onClick={() => handleStart(course.code)}>
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
