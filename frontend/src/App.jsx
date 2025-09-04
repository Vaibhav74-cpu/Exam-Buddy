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

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <Router>
      <nav
        style={{
          padding: "10px",
          background: "#333",
          color: "white",
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          🏠 Home
        </Link>
        <Link to="/notes" style={{ color: "white", textDecoration: "none" }}>
          📚 Notes
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
