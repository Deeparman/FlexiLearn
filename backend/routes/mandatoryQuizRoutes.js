const express = require('express');
const router = express.Router();
const mandatoryQuizController = require('../controller/mandatoryQuizController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post( '/start/:course', protect, authorizeRoles('student'), mandatoryQuizController.startQuiz);
router.post( '/answer/:quizId', protect, authorizeRoles('student'), mandatoryQuizController.submitAnswer );
router.get( '/result/:quizId', protect, authorizeRoles('student'), mandatoryQuizController.getResult);

module.exports = router;
