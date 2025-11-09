import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CourseRead.css";

const CourseRead = () => {
  const { course } = useParams();

  const courseData = {
    CN: {
      title: "Computer Networks",
      description:
        "Computer Networks deals with data communication, protocols, and network topologies. It explains how devices exchange data across the Internet.",
      articles: [
        {
          title: "Understanding the OSI Model",
          summary:
            "Learn the 7 layers of the OSI model and how they interact to enable communication.",
          img: "https://img.freepik.com/premium-vector/boy-sits-ground-with-book-titled-boy-is-reading_1016520-57184.jpg?semt=ais_hybrid&w=740&q=80",
          url: "https://www.geeksforgeeks.org/layers-of-osi-model/",
        },
        {
          title: "TCP vs UDP",
          summary:
            "Understand the difference between TCP’s reliability and UDP’s speed.",
          img: "https://img.freepik.com/premium-vector/boy-sits-ground-with-book-titled-boy-is-reading_1016520-57184.jpg?semt=ais_hybrid&w=740&q=80",
          url: "https://www.geeksforgeeks.org/difference-between-tcp-and-udp/",
        },
        {
          title: "Network Topologies",
          summary:
            "Explore Bus, Star, Ring, and Hybrid topologies with real-world examples.",
          img: "https://img.freepik.com/premium-vector/boy-sits-ground-with-book-titled-boy-is-reading_1016520-57184.jpg?semt=ais_hybrid&w=740&q=80",
          url: "https://www.tutorialspoint.com/computer_network_topologies",
        },
      ],
    },
    OS: {
      title: "Operating Systems",
      description:
        "Operating Systems manage hardware and software resources, handling tasks like process scheduling, memory management, and file systems.",
      articles: [
        {
          title: "What is an Operating System?",
          summary:
            "Understand the role of OS in managing computer resources efficiently.",
          img: "https://img.freepik.com/free-vector/computer-science-illustration_53876-97216.jpg?w=740&t=st=1699387161~exp=1699387761~hmac=9c6fc12ed0d0a48f6a8701c3dcad6cd8cfd1850649e03d6055c8d37b44e2c16d",
          url: "https://www.geeksforgeeks.org/operating-systems/",
        },
        {
          title: "Process vs Thread",
          summary: "Learn how multitasking works under the hood.",
          img: "https://img.freepik.com/free-vector/software-engineer-programming-abstract-concept-illustration_335657-3861.jpg?w=740&t=st=1699387277~exp=1699387877~hmac=5d4e4bfc3f76b6aefc79b6e87e091cb3620b4d4c84f4c6fbbd12aa5d9db7a5b4",
          url: "https://www.geeksforgeeks.org/difference-between-process-and-thread/",
        },
        {
          title: "Deadlocks and Prevention",
          summary:
            "Discover causes of deadlocks and how to avoid them using synchronization techniques.",
          img: "https://img.freepik.com/free-vector/deadlock-problem-concept-illustration_114360-1157.jpg?w=740&t=st=1699387354~exp=1699387954~hmac=9f2dcfbf5b9c3b7e5a3329180479d75d85f14e348db4e1706930fcb68d2e21f1",
          url: "https://www.geeksforgeeks.org/deadlock-in-operating-system/",
        },
      ],
    },
    MERN: {
      title: "MERN Stack Development",
      description:
        "MERN (MongoDB, Express, React, Node.js) is a full-stack JavaScript framework for building scalable, modern web applications.",
      articles: [
        {
          title: "Intro to MERN Stack",
          summary:
            "Overview of MongoDB, Express, React, and Node.js — how they work together.",
          img: "https://img.freepik.com/free-vector/programmer-coding-abstract-concept-illustration_335657-2620.jpg?w=740&t=st=1699387431~exp=1699388031~hmac=392f388cd0c5790c8f3b8568e169e1c53f5a6ff3379ed5a5f847f161ef9a6a4b",
          url: "https://www.mongodb.com/docs/",
        },
        {
          title: "Building a REST API with Node and Express",
          summary: "Step-by-step guide to backend development using Express.",
          img: "https://img.freepik.com/free-vector/api-concept-illustration_114360-646.jpg?w=740&t=st=1699387500~exp=1699388100~hmac=fe646b2db6eb4517ff772a2e8b81b5d39dbe2fbd55e52c01b2b2f1d6d05d3ad6",
          url: "https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm",
        },
        {
          title: "Frontend Integration with React",
          summary:
            "Learn how to connect your backend APIs to a modern React frontend.",
          img: "https://img.freepik.com/free-vector/programming-concept-illustration_114360-675.jpg?w=740&t=st=1699387555~exp=1699388155~hmac=fbf3f51650c2f17f172d7b802cfd1e1e126c6e9f0c7481e0c9e7db94e8b992b4",
          url: "https://react.dev/learn",
        },
      ],
    },
  };

  const data = courseData[course.toUpperCase()] || null;

  if (!data)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Course not found.
      </h2>
    );

  return (
    <>
      <Navbar />
      <div className="course-read-container">
        <h1 className="course-read-title">{data.title}</h1>
        <p className="course-read-description">{data.description}</p>

        <section className="course-read-section">
          <h2>Sample Articles</h2>
          <div className="articles-grid">
            {data.articles.map((a, idx) => (
              <div key={idx} className="article-card">
                <img src={a.img} alt={a.title} className="article-image" />
                <div className="article-content">
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="read-more-btn"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CourseRead;
