import React from 'react'
import "./Info.css";

const Info = () => {
  const features = [
    {
      title: "Structured Courses",
      description: "Learn step by step with expert guidance."
    },
    {
      title: "Interactive Quizzes",
      description: "Test your knowledge with practical exercises."
    },
    {
      title: "Career Growth",
      description: "Prepare for real-world tech challenges and internships."
    }
  ];
  return (
   <section className="whyus-section">
      <h2 className="whyus-heading">Why Choose FlexiLearn?</h2>
      <div className="whyus-grid">
        {features.map((feature, index) => (
          <div key={index} className="whyus-card">
            <h3 className="whyus-title">{feature.title}</h3>
            <p className="whyus-desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>  )
}

export default Info