import React, { useState } from "react";
import API from "../api/api";
import "./AddQuestion.css";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    course: "",
    level: "easy",
    set: 1,
    questionText: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    type:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updated = [...formData.options];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, options: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        course: formData.course,
        level: formData.level,
        questionText: formData.questionText,
          type: formData.type,

        set: Number(formData.set),
        options: formData.options.map((text, i) => ({
          text,
          isCorrect: i === parseInt(formData.correctIndex),
        })),
      };
      console.log("Sending payload:", payload);

      await API.post("/questions/add", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Question added successfully!");
      setFormData({
        course: "",
        level: "easy",
        questionText: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      });
    } catch (err) {
      console.error("Error adding question:", err);
      alert("Failed to add question");
    }
  };

  return (
    <div className="add-question-form">
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Subject:</label>
        <input
          type="text"
          name="course"
          placeholder="e.g. DBMS"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <label>Difficulty:</label>
        <select name="level" value={formData.level} onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label>Question Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="practice">Practice Quiz</option>
          <option value="mandatory">Mandatory Quiz</option>
        </select>

        <label>Question:</label>
        <textarea
          name="questionText"
          placeholder="Enter question text"
          value={formData.questionText}
          onChange={handleChange}
          required
        />

        <label>Options:</label>
        {formData.options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            required
          />
        ))}
        <label>Set:</label>
        <input
          type="number"
          name="set"
          placeholder="e.g. 1"
          value={formData.set || ""}
          onChange={handleChange}
          required
        />

        <label>Correct Option:</label>
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {[0, 1, 2, 3].map((i) => (
            <option key={i} value={i}>
              Option {i + 1}
            </option>
          ))}
        </select>

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;
