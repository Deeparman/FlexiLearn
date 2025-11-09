const Question = require("../model/Question");

exports.addQuestion = async (req, res) => {
  try {
    const { course, level, questionText, options, set , type} = req.body;

    if (!course || set === undefined || !level || !questionText || !options) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const correctOptions = options.filter((opt) => opt.isCorrect === true);
    if (correctOptions.length !== 1) {
      return res
        .status(400)
        .json({ message: "Exactly one option must be correct" });
    }

    const question = new Question({
      course,
      level,
      questionText,
      set,
      type,
      options,
      createdBy: req.user.id,
    });

    await question.save();
    res.status(201).json({ message: "Question added successfully", question });
  } catch (err) {
    console.log("Error in addQuestion:", err);
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

exports.getInstructorQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ createdBy: req.user.id });
    res.json(questions);
  } catch (error) {
    console.error("Fetch Questions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuestionsByCourseAndLevel = async (req, res) => {
  try {
    const { course, level, set } = req.params;
    if (!course || !level || !set) {
      return res
        .status(400)
        .json({ message: "Course, level, and set are required" });
    }

    // Use aggregation to randomly pick 15 questions
    const questions = await Question.aggregate([
      { $match: { course, level, set: parseInt(set) } },
      { $sample: { size: 15 } }, // randomly pick 15
    ]);

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "No questions found for this set" });
    }

    // Format questions (remove isCorrect for student view)
    const formattedQuestions = questions.map((q) => ({
      id: q._id,
      questionText: q.questionText,
      options: q.options.map((opt) => ({ text: opt.text })),
    }));

    res.json({ questions: formattedQuestions });
  } catch (error) {
    console.error("Get Questions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
