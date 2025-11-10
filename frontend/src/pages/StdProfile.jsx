import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";
import "./StdProfile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile data found.</p>;

  const { user, quizStats } = profile;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="welcome-card">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-silhouette-circular-260nw-2641323133.jpg"
            alt="Avatar"
            className="profile-avatar"
          />
          <h2>Welcome, {user.name}!</h2>
          <p>UID: {user.uid}</p>
        </div>

        <div className="quiz-stats-card">
          <h3>Mandatory Quiz Performance</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Quizzes Taken</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {["CN", "OS", "MERN"].map((subj) => (
                <tr key={subj}>
                  <td>{subj}</td>
                  <td>{quizStats[subj].totalQuizzes}</td>
                  <td>{quizStats[subj].totalQuestions}</td>
                  <td>{quizStats[subj].totalCorrect}</td>
                  <td>{quizStats[subj].percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentProfile;
