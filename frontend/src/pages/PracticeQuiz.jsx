import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PrcaticeQuiz.css";

const PracticeQuiz = () => {
  const { course, level, set } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in first!");
          return;
        }

        const res = await API.get(`/practice-quiz/${course}/${level}/${set}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        alert("Failed to load quiz questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [course, level, set]);

  const handleAnswer = (opt) => {
    if (selectedOption) return; // prevent multiple clicks

    const currentQuestion = questions[current];
    const isCorrect = opt.isCorrect;
    const correctOpt = currentQuestion.options.find((o) => o.isCorrect)?.text;

    setSelectedOption(opt.text);
    setCorrectAnswer(correctOpt);

    if (isCorrect) {
      setFeedback("✅ Correct!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("❌ Wrong!");
    }

    setAnswers([
      ...answers,
      {
        question: currentQuestion.questionText,
        selected: opt.text,
        correct: isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelectedOption(null);
      setFeedback("");
      setCorrectAnswer("");
    } else {
      setShowResult(true);
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (questions.length === 0) return <p>No questions found for this quiz.</p>;

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <h2 className="quiz-title">
          {course.toUpperCase()} - {level.toUpperCase()} Quiz (Set {set})
        </h2>

        {!showResult ? (
          <div className="question-card">
            <h3 className="question-text">
              Q{current + 1}. {questions[current].questionText}
            </h3>

            <div className="options-container">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${
                    selectedOption === opt.text
                      ? opt.isCorrect
                        ? "correct"
                        : "wrong"
                      : ""
                  }`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selectedOption}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {/* Feedback area */}
            {feedback && (
              <div className="feedback">
                <p>{feedback}</p>
                {!feedback.includes("Correct") && correctAnswer && (
                  <p>
                    ✅ Correct Answer:{" "}
                    <strong style={{ color: "green" }}>{correctAnswer}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Next Question / Finish button */}
            {selectedOption && (
              <button className="next-btn" onClick={handleNext}>
                {current + 1 === questions.length ? "Finish Quiz" : "Next Question"}
              </button>
            )}
          </div>
        ) : (
          <div className="result-card">
            <h2 className="result-title">🎉 Quiz Completed!</h2>
            <p className="result-score">
              You scored <strong>{score}</strong> /{" "}
              <strong>{questions.length}</strong>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PracticeQuiz;
