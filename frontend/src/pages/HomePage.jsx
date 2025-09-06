// frontend/src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🎓 Welcome to ExamBuddy</h1>
      <p>Your one-stop platform for managing exams & study notes.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/notes" style={{ marginRight: "10px" }}>
          📚 Go to Notes
        </Link>
        <Link to="/exams">📝 Go to Exams</Link>
      </div>
    </div>
  );
}

export default HomePage;
