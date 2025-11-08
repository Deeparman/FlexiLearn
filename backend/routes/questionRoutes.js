const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getInstructorQuestions,
  getQuestionsByCourseAndLevel,
} = require("../controller/questionController");

const { protect, instructorOnly } = require("../middleware/authMiddleware");

router.post("/add", protect, instructorOnly, addQuestion);
router.get("/my-questions", protect, instructorOnly, getInstructorQuestions);

// Student route
router.get("/:course/:level/:set", protect, getQuestionsByCourseAndLevel);

module.exports = router;
