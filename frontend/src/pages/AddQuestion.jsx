  
import React, { useState } from "react";

function AddQuestionPage() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Question Added:", { text, options, correctAnswer });
    alert("Add question logic will go here 🚀");
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Question Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        ))}

        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          {options.map((_, idx) => (
            <option key={idx} value={idx}>
              Correct Answer: Option {idx + 1}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}

export default AddQuestionPage;
