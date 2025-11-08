const mongoose = require('mongoose');

const practiceQuizSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: String, enum: ['CN', 'OS', 'MERN'], required: true },
  level: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  set: { type: Number, required: true },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedAnswer: String,
      isCorrect: Boolean
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PracticeQuiz', practiceQuizSchema);
