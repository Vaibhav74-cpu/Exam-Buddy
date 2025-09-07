
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
        Welcome to ExamBuddy 🚀
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mb-8">
        Your all-in-one platform for managing exams, uploading study notes, and
        preparing smarter. Stay organized and focus on what really matters —
        learning!
      </p>

      {/* CTA Buttons */}
      <div className="space-x-4">
        <Link
          to="/notes"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          📚 View Notes
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
        >
          🔑 Login
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            📝 Exams
          </h2>
          <p className="text-gray-600">
            Create and manage exams seamlessly with smart tools designed for
            teachers.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            📚 Notes
          </h2>
          <p className="text-gray-600">
            Upload, organize, and share notes with students — simple and fast.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            👩‍🎓 Students
          </h2>
          <p className="text-gray-600">
            Give students easy access to study material and improve learning
            outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
