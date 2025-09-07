
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            🎉 Register
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
