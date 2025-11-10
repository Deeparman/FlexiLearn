const User = require("../model/User");
const MandatoryQuiz = require("../model/MandatoryQuiz");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const subjects = ["CN", "OS", "MERN"];
    const quizStats = {};

    for (let course of subjects) {
      const quizzes = await MandatoryQuiz.find({
        student: user._id,
        course,
        completed: true,
      }).populate("questions.questionId");

      let totalQuizzes = quizzes.length;
      let totalQuestions = 0;
      let totalCorrect = 0;

      quizzes.forEach((quiz) => {
        totalQuestions += quiz.questions.length;
        totalCorrect += quiz.questions.filter((q) => q.isCorrect).length;
      });

      quizStats[course] = {
        totalQuizzes,
        totalQuestions,
        totalCorrect,
        percentage:
          totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 0,
      };
    }

    res.json({
      user: {
        name: user.name,
        uid: user.uid,
      },
      quizStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
