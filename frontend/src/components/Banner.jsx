import React from "react";
import "./Banner.css";
import banner from "../assets/banner.png"; 

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-left">
        <h1 className="banner-title">Welcome to FlexiLearn</h1>
        <p className="banner-quote">
          "Learn smart. Grow fast. Empower your future with knowledge."
        </p>
        <button className="get-started-btn">Get Started</button>
      </div>

      <div className="banner-right">
        <img src={banner} alt="Learning Illustration" className="banner-img" />
      </div>
    </section>
  );
};

export default Banner;
