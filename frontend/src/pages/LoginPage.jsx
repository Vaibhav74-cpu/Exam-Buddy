// frontend/src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token
        localStorage.setItem("token", data.token);
        alert("✅ Login successful!");
        navigate("/notes"); // Redirect to notes page
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔑 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: "10px" }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: "10px" }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
