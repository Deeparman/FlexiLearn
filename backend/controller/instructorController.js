const User = require("../model/User");
const MandatoryQuiz = require("../model/MandatoryQuiz");

// all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("name email uid");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//  student  results
exports.getStudentResults = async (req, res) => {
  try {
    const { course } = req.query; 
    const filter = {};
    if (course) filter.course = course;

    const results = await MandatoryQuiz.find(filter)
      .populate("student", "name uid email")
      .populate("questions.questionId", "questionText options");

    const formatted = results.map(quiz => ({
      studentName: quiz.student.name,
      studentUid: quiz.student.uid,
      course: quiz.course,
      totalQuestions: quiz.questions.length,
      correctAnswers: quiz.questions.filter(q => q.isCorrect).length,
      breakdown: quiz.questions.map(q => ({
        question: q.questionId.questionText,
        selectedAnswer: q.selectedAnswer,
        isCorrect: q.isCorrect
      }))
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
