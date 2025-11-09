import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MandatoryQuiz.css";

const MandatoryQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [result, setResult] = useState(null);
  const [quizOver, setQuizOver] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load the first question for the quiz
  useEffect(() => {
    const fetchFirstQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/mandatory-quiz/result/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.completed) {
          setResult(res.data);
          setQuizOver(true);
          setLoading(false);
          return;
        }
      } catch {}
      try {
        const token = localStorage.getItem("token");
        const res = await API.post(
          `/mandatory-quiz/answer/${quizId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.message === "Quiz completed!") {
          setResult(res.data);
          setQuizOver(true);
          return;
        }
        setQuestion(res.data.question);
        setDifficulty(res.data.difficulty);
        setLoading(false);
      } catch (err) {
        console.error("Error loading quiz:", err);
        navigate(-1);
      }
    };
    fetchFirstQuestion();
  }, [quizId, navigate]);

  // Timer countdown
  useEffect(() => {
    if (quizOver) return;
    if (timeLeft <= 0) {
      handleEndQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizOver]);

  const handleAnswer = async (selectedAnswer) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        `/mandatory-quiz/answer/${quizId}`,
        { questionId: question.id, selectedAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message === "Quiz completed!") {
        setResult(res.data);
        setQuizOver(true);
        return;
      }

      setQuestion(res.data.question);
      setDifficulty(res.data.difficulty);
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  const handleEndQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/mandatory-quiz/result/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Error ending quiz:", err);
    }
    setQuizOver(true);
  };

  if (loading) return <p>Loading quiz...</p>;

  if (quizOver && result) {
    return (
      <>
        <Navbar />
        <div className="quiz-container">
          <h2>Quiz Completed!</h2>
          <p>
            You answered <b>{result.correctAnswers}</b> out of{" "}
            <b>{result.totalQuestions}</b> correctly.
          </p>
          <div className="summary">
            <h3>Summary:</h3>
            <ul>
              {result.breakdown.map((item, i) => (
                <li key={i}>
                  <strong>Q{i + 1}:</strong> {item.questionId.text} <br />
                  <em>Selected:</em> {item.selectedAnswer}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <h2>Mandatory Quiz</h2>
        <p>
          Difficulty: <b>{difficulty}</b>
        </p>
        <p>
          Time Left:{" "}
          <b>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </b>
        </p>

        {question && (
          <div className="question-block">
            <h3>{question.text}</h3>
            <ul className="options">
              {question.options.map((opt, i) => (
                <li key={i} onClick={() => handleAnswer(opt)}>
                  {opt}
                </li>
              ))}
            </ul>
            <button onClick={handleEndQuiz}>Submit Quiz</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MandatoryQuiz;
