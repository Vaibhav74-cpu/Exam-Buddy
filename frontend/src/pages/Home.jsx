

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🎓 Welcome to ExamBuddy</h1>
      <p>Your one-stop platform for exams & study resources.</p>

      <Link
        to="/notes"
        style={{
          display: "inline-block",
          marginTop: "15px",
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        📚 View Notes
      </Link>
    </div>
  );
};

export default Home;
