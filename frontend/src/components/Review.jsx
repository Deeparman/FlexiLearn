import React from "react";
import "./Review.css";


const testimonialsData = [
  {
    name: "Aarav Sharma",
    review:
      "FlexiLearn helped me improve my coding confidence. The quizzes are well structured!",
    role: "B.Tech Student",
  },
  {
    name: "Priya Mehta",
    review:
      "The instructors are amazing! I love how interactive and easy to understand the lessons are.",
    role: "Computer Science Student",
  },
  {
    name: "Rahul Verma",
    review:
      "I finally cleared my DSA basics thanks to FlexiLearn’s practice quizzes.",
    role: "Engineering Student",
  },
  {
    name: "Sneha Patel",
    review:
      "The interface is super clean and motivating. I actually look forward to studying now.",
    role: "IT Student",
  },
  {
    name: "Karan Gupta",
    review:
      "I loved the mandatory quiz feature. It really helps to stay consistent.",
    role: "Software Engineer Intern",
  },
  {
    name: "Neha Reddy",
    review:
      "Excellent platform for beginners — everything explained so clearly.",
    role: "Web Developer Trainee",
  },
  {
    name: "Vikram Singh",
    review:
      "From basics to advanced, it covers everything in a structured way!",
    role: "AI Enthusiast",
  },
  {
    name: "Divya Nair",
    review: "The best part is how easy it is to track progress. Love it!",
    role: "Student",
  },
];
const Review = () => {
  return (
    <div className="review-section">
      <h2 className="review-heading">What Our Students Say</h2>
      <div className="review-grid">
        {testimonialsData.map((rev, index) => (
          <div key={index} className="review-card">
            <p className="review-name">- {rev.name}</p>
            <p className="review-comment">“{rev.review}”</p>
            <p className="review-role">{rev.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
