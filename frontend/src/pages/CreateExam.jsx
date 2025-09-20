
import React, { useState } from "react";

function CreateExamPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Created:", { title, description, duration });
    alert("Exam creation logic will go here 🚀");
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Create Exam
        </button>
      </form>
    </div>
  );
}

export default CreateExamPage;
