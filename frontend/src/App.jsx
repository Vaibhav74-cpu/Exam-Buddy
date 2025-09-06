// // import { useState } from 'react'
// // import './App.css'
// // import Home from './pages/Home'
// // // import NotesPage from './pages/NotesPage'
// // import NotesPage from "./pages/NotesPage";

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NotesPage from "./pages/NotesPage";

// const user = {
//   name: "Vaibhav",
//   email: "vaibhav@test.com",
//   role: "teacher", // or "student"
//   token: "PUT_YOUR_JWT_TOKEN_HERE", // from login
// };

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <NotesPage></NotesPage>
//     {/* <Router>
//       <Routes>
//         <Route path="/notes" element={<NotesPage user={user} />} />
//         <Route path="/" element={<h1>Welcome to ExamBuddy 🚀</h1>} />
//       </Routes>
//     </Router> */}
//     </>
//   )
// }

// export default App


// import NotesPage from "./pages/NotesPage";

// function App() {
//   return (
//     <div>
//       <NotesPage />
//     </div>
//   );
// }

// export default App;


// ************************************************

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import NotesPage from "./pages/NotesPage";

// function App() {
//   return (
//     <Router>
//       <nav
//         style={{
//           padding: "10px",
//           background: "#333",
//           color: "white",
//           display: "flex",
//           gap: "15px",
//         }}
//       >
//         <Link to="/" style={{ color: "white", textDecoration: "none" }}>
//           🏠 Home
//         </Link>
//         <Link to="/notes" style={{ color: "white", textDecoration: "none" }}>
//           📚 Notes
//         </Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/notes" element={<NotesPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// *******************************************************


// // frontend/src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import NotesPage from "./pages/NotesPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";

// function App() {
//   return (
//     <Router>
//       <nav style={{ padding: "10px", background: "#eee" }}>
//         <Link to="/notes" style={{ marginRight: "10px" }}>📚 Notes</Link>
//         <Link to="/login" style={{ marginRight: "10px" }}>🔑 Login</Link>
//         <Link to="/register">📝 Register</Link>
//       </nav>

//       <Routes>
//         <Route path="/notes" element={<NotesPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// ********************************************************


// // frontend/src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NotesPage from "./pages/NotesPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       <Navbar />  {/* ✅ Reusable Navbar */}
//       <Routes>
//         <Route path="/notes" element={<NotesPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// // frontend/src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NotesPage from "./pages/NotesPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/notes"
//           element={
//             <ProtectedRoute>
//               <NotesPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// ******************************************

// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router className="flex h-screen items-center justify-center bg-gray-900 text-white text-4xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
