// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // save token
        alert("✅ Login successful!");

        navigate("/notes"); // ⬅️ Redirect to Notes page
      } else {
        alert(`❌ Login failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔑 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", display: "block" }}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", display: "block" }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
