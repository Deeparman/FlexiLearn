const MandatoryQuiz = require("../model/MandatoryQuiz");
const Question = require("../model/Question");

// Start a quiz
exports.startQuiz = async (req, res) => {
  try {
    const { course } = req.params;

    let quiz = await MandatoryQuiz.findOne({
      student: req.user.id,
      course,
      completed: false,
    });
    if (!quiz) {
      quiz = new MandatoryQuiz({
        student: req.user.id,
        course,
        currentDifficulty: "easy",
      });
      await quiz.save();
    }

    // Fetch first easy question not yet attempted
    const attemptedIds = quiz.questions.map((q) => q.questionId);
    const question = await Question.findOne({
      course,
      level: "easy",
      type: 'mandatory', 
      _id: { $nin: attemptedIds },
    });

    if (!question) return res.json({ message: "No questions available." });

    res.json({
      quizId: quiz._id,
      question: {
        id: question._id,
        text: question.questionText,
        options: question.options.map((opt) => opt.text),
      },
      difficulty: "easy",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Submit answer and get next question (adaptive logic)
// Submit answer and get next question (adaptive logic)
exports.submitAnswer = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionId, selectedAnswer } = req.body;

    const quiz = await MandatoryQuiz.findById(quizId);
    if (!quiz) return res.status(400).json({ message: "Quiz not found" });
    if (quiz.completed)
      return res.status(400).json({ message: "Quiz already completed" });

    // If this is the first call and no answer is sent, just return the first question
    if (!questionId || !selectedAnswer) {
      const attemptedIds = quiz.questions.map((q) => q.questionId);
      const firstQuestion = await Question.findOne({
        course: quiz.course,
        level: quiz.currentDifficulty,
        type: "mandatory",
        _id: { $nin: attemptedIds },
      });

      if (!firstQuestion)
        return res.json({ message: "No questions available." });

      return res.json({
        question: {
          id: firstQuestion._id,
          text: firstQuestion.questionText,
          options: firstQuestion.options.map((opt) => opt.text),
        },
        difficulty: quiz.currentDifficulty,
      });
    }

    // Normal answer submission
    const question = await Question.findById(questionId);
    if (!question)
      return res.status(400).json({ message: "Question not found" });

    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption.text === selectedAnswer;

    // Store attempt
    quiz.questions.push({
      questionId,
      selectedAnswer,
      difficulty: quiz.currentDifficulty,
      isCorrect,
    });

    // Adaptive difficulty logic
    let nextDifficulty = quiz.currentDifficulty;
    if (quiz.currentDifficulty === "easy" && isCorrect) nextDifficulty = "medium";
    else if (quiz.currentDifficulty === "medium" && isCorrect) nextDifficulty = "hard";
    else if (quiz.currentDifficulty === "hard" && !isCorrect) nextDifficulty = "medium";
    else if (quiz.currentDifficulty === "medium" && !isCorrect) nextDifficulty = "easy";
    // easy wrong stays easy, hard correct stays hard

    quiz.currentDifficulty = nextDifficulty;
    await quiz.save();

    // Fetch next question
    const attemptedIds = quiz.questions.map((q) => q.questionId);
    const nextQuestion = await Question.findOne({
      course: quiz.course,
      level: nextDifficulty,
      type: "mandatory",
      _id: { $nin: attemptedIds },
    });

    if (!nextQuestion) {
      quiz.completed = true;
      quiz.completedAt = new Date();
      await quiz.save();
        await quiz.populate('questions.questionId');


      const totalCorrect = quiz.questions.filter((q) => q.isCorrect).length;
      return res.json({
        message: "Quiz completed!",
        totalQuestions: quiz.questions.length,
        correctAnswers: totalCorrect,
        breakdown: quiz.questions.map((q) => ({
          question: q.questionId?.questionText || "Unknown",
          selectedAnswer: q.selectedAnswer,
          isCorrect: q.isCorrect,
        })),
        completedAt: quiz.completedAt,
      });
    }

    res.json({
      question: {
        id: nextQuestion._id,
        text: nextQuestion.questionText,
        options: nextQuestion.options.map((opt) => opt.text),
      },
      difficulty: nextDifficulty,
    });
  } catch (err) {
    console.error("Error in submitAnswer:", err);
    res.status(500).json({ message: err.message });
  }
};


//  Get completed quiz result
exports.getResult = async (req, res) => {
  try {
    const quiz = await MandatoryQuiz.findById(req.params.quizId).populate(
      "questions.questionId"
    );
    if (!quiz || !quiz.completed)
      return res.status(400).json({ message: "Quiz not completed yet" });

    const totalCorrect = quiz.questions.filter((q) => q.isCorrect).length;
    res.json({
      totalQuestions: quiz.questions.length,
      correctAnswers: totalCorrect,
      breakdown: quiz.questions.map((q) => ({
        questionId: { text: q.questionId.questionText },
        selectedAnswer: q.selectedAnswer,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};