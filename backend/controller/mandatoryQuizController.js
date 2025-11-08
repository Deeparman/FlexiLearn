const MandatoryQuiz = require('../model/MandatoryQuiz');
const Question = require('../model/Question');

// Start a quiz
exports.startQuiz = async (req, res) => {
  try {
    const { course } = req.params;

    // Check if student already has ongoing quiz
    let quiz = await MandatoryQuiz.findOne({ student: req.user.id, course, completed: false });
    if (!quiz) {
      quiz = new MandatoryQuiz({ student: req.user.id, course, currentDifficulty: 'easy' });
      await quiz.save();
    }

    // Fetch first easy question not yet attempted
    const attemptedIds = quiz.questions.map(q => q.questionId);
    const question = await Question.findOne({
      course,
      level: 'easy',
      _id: { $nin: attemptedIds }
    });

    if (!question) return res.json({ message: 'No questions available.' });

    res.json({
      quizId: quiz._id,
      question: {
        id: question._id,
        text: question.text,
        options: question.options
      },
      difficulty: 'easy'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Submit answer and get next question (adaptive logic)
exports.submitAnswer = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionId, selectedAnswer } = req.body;

    const quiz = await MandatoryQuiz.findById(quizId);
    if (!quiz || quiz.completed) return res.status(400).json({ message: 'Quiz not found or completed' });

    const question = await Question.findById(questionId);
    const isCorrect = question.correctAnswer === selectedAnswer;

    // Store attempt
    quiz.questions.push({
      questionId,
      selectedAnswer,
      difficulty: quiz.currentDifficulty,
      isCorrect
    });

    // Adaptive logic
    let nextDifficulty = quiz.currentDifficulty;
    if (quiz.currentDifficulty === 'easy' && isCorrect) nextDifficulty = 'medium';
    else if (quiz.currentDifficulty === 'medium' && isCorrect) nextDifficulty = 'hard';
    else if (quiz.currentDifficulty === 'hard' && !isCorrect) nextDifficulty = 'medium';
    else if (quiz.currentDifficulty === 'medium' && !isCorrect) nextDifficulty = 'easy';
    // easy wrong stays easy, hard correct stays hard

    quiz.currentDifficulty = nextDifficulty;
    await quiz.save();

    // Fetch next question
    const attemptedIds = quiz.questions.map(q => q.questionId);
    const nextQuestion = await Question.findOne({
      course: quiz.course,
      level: nextDifficulty,
      _id: { $nin: attemptedIds }
    });

    if (!nextQuestion) {
      quiz.completed = true;
      quiz.completedAt = new Date();
      await quiz.save();

      const totalCorrect = quiz.questions.filter(q => q.isCorrect).length;
      return res.json({
        message: 'Quiz completed!',
        totalQuestions: quiz.questions.length,
        correctAnswers: totalCorrect,
        breakdown: quiz.questions
      });
    }

    res.json({
      question: {
        id: nextQuestion._id,
        text: nextQuestion.text,
        options: nextQuestion.options
      },
      difficulty: nextDifficulty
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get completed quiz result
exports.getResult = async (req, res) => {
  try {
    const quiz = await MandatoryQuiz.findById(req.params.quizId).populate('questions.questionId');
    if (!quiz || !quiz.completed) return res.status(400).json({ message: 'Quiz not completed yet' });

    const totalCorrect = quiz.questions.filter(q => q.isCorrect).length;
    res.json({
      totalQuestions: quiz.questions.length,
      correctAnswers: totalCorrect,
      breakdown: quiz.questions
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
