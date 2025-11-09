import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PracticeQuizSelect.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PracticeQuizSelect = () => {
  const navigate = useNavigate();
  const { course } = useParams();

  const [level, setLevel] = useState("");
  const [setNum, setSetNum] = useState("");

  const handleStart = () => {
    if (!level || !setNum) {
      alert("Please choose difficulty level and set number!");
      return;
    }
    navigate(`/practice/${course}/${level}/${setNum}`);
  };

  return (
    <>
    <Navbar />
      <div className="practice-container">
        <h1>Practice Quiz — {course.toUpperCase()}</h1>
        <p>
          “Practice is the key to mastery. The more you practice, the more confident you become.”
        </p>

        <div className="practice-selectors">
          <div className="selector-card">
            <label>Choose Difficulty:</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">-- Select Level --</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="selector-card">
            <label>Choose Set:</label>
            <select value={setNum} onChange={(e) => setSetNum(e.target.value)}>
              <option value="">-- Select Set --</option>
              <option value="1">Set 1</option>
              <option value="2">Set 2</option>
              <option value="3">Set 3</option>
            </select>
          </div>
        </div>
        <button className="start-btn" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
      <Footer/>
    </>
  );
};

export default PracticeQuizSelect;
