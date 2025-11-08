const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

//  protected route for students
router.get("/student-dashboard", protect, authorizeRoles("student"), (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, this is your student dashboard!` });
});

// protected route for instructors
router.post("/instructor/add-question", protect, authorizeRoles("instructor"), (req, res) => {
  res.json({ message: `Hello ${req.user.name}, question added successfully.` });
});

module.exports = router;
