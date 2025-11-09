const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  course: {
    type: String,
    enum: ["CN", "OS", "MERN STACK"],
    required: true,
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
   set: {
    type: Number,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["practice", "mandatory"],
    // required: true
  },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
