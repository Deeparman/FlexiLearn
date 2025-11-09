import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";
import "./MandatoryQuizIntro.css";

const MandatoryQuizIntro = () => {
  const { course } = useParams();
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        `/mandatory-quiz/start/${course}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message === "No questions available.") {
        alert("No questions available for this course.");
        return;
      }

      const quizId = res.data.quizId;
      navigate(`/mandatory-quiz/${quizId}`);
    } catch (err) {
      console.error("Error starting quiz:", err);
      alert("Failed to start quiz.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="quiz-intro-container">
        <h1>Mandatory Quiz</h1>

        <div className="quiz-intro-card">
          <h3>📘 Quiz Guidelines</h3>
          <ul>
            <li><b>One attempt only</b></li>
            <li>Total time: <b>10 minutes</b></li>
            <li>Difficulty adapts automatically based on your answers.</li>
            <li>You won’t see if answers are correct until the end.</li>
            <li>Submit all answers before the timer ends.</li>
          </ul>
        </div>

        <button className="start-quiz-btn" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
      <Footer />
    </>
  );
};

export default MandatoryQuizIntro;
