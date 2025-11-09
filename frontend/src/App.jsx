import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentHome from "./pages/StudentHome";
import CoursePage from "./pages/CoursePage";
import PracticeQuiz from "./pages/PracticeQuiz";
import PracticeQuizSelect from "./pages/PracticeQuizSelect";
import MandatoryQuiz from "./pages/MandatoryQuiz";
import MandatoryQuizIntro from "./pages/MandatoryQuizIntro";
import CourseRead from "./pages/CourseRead";
import InstructorHome from "./pages/InstructorHome";

//  fix mandatory quiz route 
// build instructor dashboard and routes
//  upload demo quiz for each subject

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StudentHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/course/:course/practice"
            element={<PracticeQuizSelect />}
          />
          <Route
            path="/practice/:course/:level/:set"
            element={<PracticeQuiz />}
          />
          <Route
            path="/mandatory-quiz/:course"
            element={<MandatoryQuizIntro />}
          />
          <Route path="/mandatory-quiz/:quizId" element={<MandatoryQuiz />} />

          <Route path="/course/:courseName" element={<CoursePage />} />
          <Route path="/read/:course" element={<CourseRead />} />

          <Route path="/instructor" element={<InstructorHome />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
