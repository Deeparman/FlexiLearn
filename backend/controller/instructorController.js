const User = require("../model/User");
const MandatoryQuiz = require("../model/MandatoryQuiz");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "name email uid"
    );
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStudentResults = async (req, res) => {
  try {
    const { course } = req.query;
    const filter = { completed: true };
    if (course) filter.course = course;

    const results = await MandatoryQuiz.find(filter)
      .populate("student", "name uid email")
      .populate("questions.questionId", "questionText options");

    const formatted = results.map((quiz) => {
      // Handle missing student
      const student = quiz.student || { name: "Unknown", uid: "N/A" };

      return {
        studentName: student.name,
        studentUid: student.uid,
        course: quiz.course,
        totalQuestions: quiz.questions.length,
        correctAnswers: quiz.questions.filter((q) => q.isCorrect).length,
        completedAt: quiz.completedAt || quiz.createdAt,
        breakdown: quiz.questions.map((q) => ({
          question: q.questionId?.questionText || "Unknown",
          selectedAnswer: q.selectedAnswer,
          isCorrect: q.isCorrect,
        })),
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
