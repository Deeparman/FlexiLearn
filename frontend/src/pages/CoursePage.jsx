import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CoursePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CoursePage = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="course-page">
      <h1 className="course-title">{courseName} Course</h1>
      <p className="course-subtitle">
        Choose how you’d like to learn and improve your skills in {courseName}.
      </p>

      <div className="course-card-container">
        <div className="course-card">
          <h2>Practice Quiz</h2>
          <p>
            Attempt unlimited quizzes, pick difficulty levels, and sharpen your
            understanding through adaptive learning.
          </p>
          <button className="course-btn" onClick={() => navigate(`/course/${courseName}/practice`)}>
            Start Practice
          </button>
        </div>

        <div className="course-card">
          <h2>Mandatory Quiz</h2>
          <p>
            Test your knowledge in this course with a fixed set of questions.
            You’ll get your score at the end.
          </p>
          <button
            className="course-btn"
            onClick={() => navigate(`/mandatory-quiz-intro/${courseName}`)}
          >
            Start Test
          </button>
        </div>

        <div className="course-card">
          <h2>Articles</h2>
          <p>
            Read handpicked articles and guides to deepen your conceptual
            understanding.
          </p>
          <button
            className="course-btn"
            onClick={() => navigate(`/read/${courseName}`)}
          >
            Read Articles
          </button>
        </div>
      </div>
    </div>
    <Footer/>
        </>

  );
};

export default CoursePage;
