const PracticeQuiz = require('../model/PracticeQuiz');
const Question = require('../model/Question');

// Get questions for Practice Quiz
exports.getQuestions = async (req, res) => {
  try {
    const { course, level, set } = req.params;

    const questions = await Question.aggregate([
      { $match: { course, level, set: parseInt(set) } },
      { $sample: { size: 15 } } // Random 15 questions
    ]);

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Submit Practice Quiz attempt
exports.submitQuiz = async (req, res) => {
  try {
    const { course, level, set, answers } = req.body; // answers: [{questionId, selectedAnswer}]
    
    const questions = await Question.find({ _id: { $in: answers.map(a => a.questionId) } });
    
    const result = answers.map(ans => {
      const question = questions.find(q => q._id.toString() === ans.questionId);
      return {
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        isCorrect: question.correctAnswer === ans.selectedAnswer
      };
    });

    const practiceQuiz = new PracticeQuiz({
      student: req.user.id,
      course,
      level,
      set,
      questions: result
    });

    await practiceQuiz.save();
    res.json({ message: 'Practice quiz submitted!', practiceQuiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get all attempts of a student
exports.getHistory = async (req, res) => {
  try {
    const attempts = await PracticeQuiz.find({ student: req.user.id }).populate('questions.questionId');
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
