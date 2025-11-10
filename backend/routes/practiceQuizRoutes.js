const express = require('express');
const router = express.Router();
const practiceQuizController = require('../controller/practiceQuizController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/:course/:level/:set',protect,authorizeRoles('student'), practiceQuizController.getQuestions);
router.post('/submit',protect,authorizeRoles('student'),practiceQuizController.submitQuiz);
router.get('/history',protect,authorizeRoles('student'),practiceQuizController.getHistory);

module.exports = router;
