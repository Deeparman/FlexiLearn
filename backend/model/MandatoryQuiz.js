const mongoose = require('mongoose');

const mandatoryQuizSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: String, enum: ['CN', 'OS', 'MERN'], required: true },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedAnswer: String,
      difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
      isCorrect: Boolean
    }
  ],
  currentDifficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('MandatoryQuiz', mandatoryQuizSchema);
