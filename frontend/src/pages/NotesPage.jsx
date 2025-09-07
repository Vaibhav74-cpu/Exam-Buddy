
import React, { useState, useEffect } from "react";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Fetch notes from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Failed to fetch notes:", err));
  }, []);

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !description || !file) {
      alert("⚠️ All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("noteFile", file);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("❌ You must be logged in to upload notes!");
        return;
      }

      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const newNote = await res.json();
        setNotes([...notes, newNote]);
        setTitle("");
        setDescription("");
        setFile(null);
        alert("✅ Note uploaded successfully!");
      } else {
        const errorData = await res.json();
        alert(`❌ Failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Error uploading note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        📚 My Notes
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto mb-8 space-y-4"
      >
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
        >
          📤 Upload Note
        </button>
      </form>

      {/* Notes List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
            <p className="text-gray-600 mt-2">{note.description}</p>
            <a
              href={`http://localhost:5000${note.fileUrl}`}
              download
              className="mt-3 inline-block text-blue-600 hover:underline"
            >
              📂 Download File
            </a>
            <p className="text-sm text-gray-400 mt-2">
              Uploaded by:{" "}
              <span className="font-medium text-gray-600">
                {note.uploadedBy?.name}
              </span>{" "}
              ({note.uploadedBy?.email})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
