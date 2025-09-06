// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const NotesPage = ({ user }) => {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch all notes
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/notes");
//         setNotes(data);
//       } catch (error) {
//         console.error("❌ Failed to fetch notes", error);
//       }
//     };
//     fetchNotes();
//   }, []);

//   // Upload new note (only for teacher)
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !file) {
//       alert("All fields are required!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("noteFile", file);

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:5000/api/notes", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });

//       alert("✅ Note uploaded successfully!");
//       setTitle("");
//       setDescription("");
//       setFile(null);

//       // Reload notes list
//       const { data } = await axios.get("http://localhost:5000/api/notes");
//       setNotes(data);
//     } catch (error) {
//       console.error("❌ Upload failed:", error);
//       alert("Upload failed. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📘 Notes</h2>

//       {/* Upload form only for teachers */}
//       {user?.role === "teacher" && (
//         <form
//           onSubmit={handleUpload}
//           style={{
//             marginBottom: "20px",
//             padding: "15px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//           }}
//         >
//           <h3>Upload Note</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <br />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <br />
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
//           <br />
//           <button type="submit" disabled={loading}>
//             {loading ? "Uploading..." : "Upload Note"}
//           </button>
//         </form>
//       )}

//       {/* Notes List */}
//       <h3>Available Notes</h3>
//       {notes.length === 0 ? (
//         <p>No notes uploaded yet.</p>
//       ) : (
//         <ul>
//           {notes.map((note) => (
//             <li key={note._id} style={{ marginBottom: "15px" }}>
//               <strong>{note.title}</strong> - {note.description} <br />
//               Uploaded by: {note.uploadedBy?.name} ({note.uploadedBy?.email}) <br />
//               <a
//                 href={`http://localhost:5000${note.fileUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 📂 Download
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotesPage;


// import { useEffect, useState } from "react";

// const NotesPage = () => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/notes")
//       .then((res) => res.json())
//       .then((data) => setNotes(data))
//       .catch((err) => console.error("Error fetching notes:", err));
//   }, []);

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>📚 Notes</h1>
//       {notes.length === 0 ? (
//         <p>No notes available.</p>
//       ) : (
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {notes.map((note) => (
//             <li
//               key={note._id}
//               style={{
//                 marginBottom: "15px",
//                 padding: "10px",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 background: "#f9f9f9",
//               }}
//             >
//               <h3>{note.title}</h3>
//               <p>{note.description}</p>
//               <a
//                 href={`http://localhost:5000${note.fileUrl}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 📂 Download File
//               </a>
//               <p style={{ fontSize: "14px", color: "gray" }}>
//                 Uploaded by: {note.uploadedBy?.name} ({note.uploadedBy?.email})
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotesPage;


// frontend/src/pages/NotesPage.jsx
// import React, { useState, useEffect } from "react";

// function NotesPage() {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);

//   // Fetch notes from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/notes")
//       .then((res) => res.json())
//       .then((data) => setNotes(data))
//       .catch((err) => console.error("Failed to fetch notes:", err));
//   }, []);

//   // Handle upload
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !file) {
//       alert("All fields are required!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("noteFile", file);

//     try {
//       const res = await fetch("http://localhost:5000/api/notes", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         const newNote = await res.json();
//         setNotes([...notes, newNote]); // update UI
//         setTitle("");
//         setDescription("");
//         setFile(null);
//         alert("Note uploaded successfully!");
//       } else {
//         alert("Failed to upload note");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>📚 Notes</h1>

//       {/* Upload Form */}
//       <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <input
//           type="text"
//           placeholder="Enter Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <button type="submit">Upload Note</button>
//       </form>

//       {/* Notes List */}
//       {notes.map((note) => (
//         <div
//           key={note._id}
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//             padding: "10px",
//             marginBottom: "10px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <h3>{note.title}</h3>
//           <p>{note.description}</p>
//           <a href={`http://localhost:5000${note.fileUrl}`} download>
//             📂 Download File
//           </a>
//           <p style={{ fontSize: "12px", color: "gray" }}>
//             Uploaded by: {note.uploadedBy?.name} ({note.uploadedBy?.email})
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default NotesPage;


// ******************************************************************************************



// import React, { useState, useEffect } from "react";

// function NotesPage() {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);

//   // Fetch notes from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/notes")
//       .then((res) => res.json())
//       .then((data) => setNotes(data))
//       .catch((err) => console.error("Failed to fetch notes:", err));
//   }, []);

//   // Handle upload
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !file) {
//       alert("All fields are required!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("noteFile", file);

//     try {
//       // 🔑 Get token from localStorage (set during login)
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("You must be logged in to upload notes!");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/api/notes", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ attach token
//         },
//         body: formData,
//       });

//       if (res.ok) {
//         const newNote = await res.json();
//         setNotes([...notes, newNote]); // update UI
//         setTitle("");
//         setDescription("");
//         setFile(null);
//         alert("✅ Note uploaded successfully!");
//       } else {
//         const errorData = await res.json();
//         alert(`❌ Failed to upload note: ${errorData.message}`);
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("❌ Error uploading note");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>📚 Notes</h1>

//       {/* Upload Form */}
//       <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <input
//           type="text"
//           placeholder="Enter Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//           style={{ marginRight: "10px" }}
//         />
//         <button type="submit">Upload Note</button>
//       </form>

//       {/* Notes List */}
//       {notes.map((note) => (
//         <div
//           key={note._id}
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//             padding: "10px",
//             marginBottom: "10px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <h3>{note.title}</h3>
//           <p>{note.description}</p>
//           <a href={`http://localhost:5000${note.fileUrl}`} download>
//             📂 Download File
//           </a>
//           <p style={{ fontSize: "12px", color: "gray" }}>
//             Uploaded by: {note.uploadedBy?.name} ({note.uploadedBy?.email})
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default NotesPage;


// // ***************************************************************************************************************


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
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("noteFile", file);

    try {
      // 🔑 Get token from localStorage (set during login)
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to upload notes!");
        return;
      }

      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
        body: formData,
      });

      if (res.ok) {
        const newNote = await res.json();
        setNotes([...notes, newNote]); // update UI
        setTitle("");
        setDescription("");
        setFile(null);
        alert("✅ Note uploaded successfully!");
      } else {
        const errorData = await res.json();
        alert(`❌ Failed to upload note: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Error uploading note");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Notes</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Upload Note</button>
      </form>

      {/* Notes List */}
      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <a href={`http://localhost:5000${note.fileUrl}`} download>
            📂 Download File
          </a>
          <p style={{ fontSize: "12px", color: "gray" }}>
            Uploaded by: {note.uploadedBy?.name} ({note.uploadedBy?.email})
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotesPage;
