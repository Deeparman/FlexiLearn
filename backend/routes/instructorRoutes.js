const express = require("express");
const router = express.Router();
const instructorController = require("../controller/instructorController");
const { protect, instructorOnly } = require("../middleware/authMiddleware");

router.get("/students", protect, instructorOnly, instructorController.getAllStudents);
router.get("/student-results", protect, instructorOnly, instructorController.getStudentResults);

module.exports = router;
