import React, { useEffect, useState } from "react";
import API from "../api/api";
import "./StudentReport.css";

const StudentReport = () => {
  const [subject, setSubject] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await API.get(`/instructor/student-results?course=${subject}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      alert("Failed to fetch student reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-report-table">
      <h2>Student Quiz Reports</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Enter subject name (e.g. DBMS)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button onClick={fetchReports} disabled={!subject || loading}>
          {loading ? "Loading..." : "Fetch Reports"}
        </button>
      </div>

      {reports.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Correct Answers</th>
              <th>Total Questions</th>
              <th>Score (%)</th>
              <th>Completed On</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td>{r.studentName}</td>
                <td>{r.course}</td>
                <td>{r.correctAnswers}</td>
                <td>{r.totalQuestions}</td>
                <td>{((r.correctAnswers / r.totalQuestions) * 100).toFixed(1)}</td>
                <td>{new Date(r.completedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No data available.</p>
      )}
    </div>
  );
};

export default StudentReport;
