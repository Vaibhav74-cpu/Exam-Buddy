
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("✅ Login successful!");
        navigate("/notes");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Login to ExamBuddy
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            🚀 Login
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
