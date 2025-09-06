// // frontend/src/components/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // ❌ Clear token
//     alert("👋 Logged out successfully!");
//     navigate("/login"); // Redirect to login
//   };

//   return (
//     <nav style={{ padding: "10px", background: "#eee" }}>
//       <Link to="/notes" style={{ marginRight: "10px" }}>📚 Notes</Link>

//       {!token ? (
//         <>
//           <Link to="/login" style={{ marginRight: "10px" }}>🔑 Login</Link>
//           <Link to="/register">📝 Register</Link>
//         </>
//       ) : (
//         <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
//           🚪 Logout
//         </button>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


// ***********************************************************


// // frontend/src/components/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // remove JWT
//     navigate("/login"); // redirect to login
//   };

//   return (
//     <nav style={{ padding: "10px", background: "#f0f0f0" }}>
//       <Link to="/" style={{ marginRight: "10px" }}>
//         Home
//       </Link>

//       {!token ? (
//         <>
//           <Link to="/login" style={{ marginRight: "10px" }}>
//             Login
//           </Link>
//           <Link to="/register">Register</Link>
//         </>
//       ) : (
//         <>
//           <Link to="/notes" style={{ marginRight: "10px" }}>
//             Notes
//           </Link>
//           <button onClick={handleLogout} style={{ cursor: "pointer" }}>
//             Logout
//           </button>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;



// ****************************************

// frontend/src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  // ✅ Fetch user profile if logged in
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch((err) => console.error("Profile fetch failed:", err));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    setUser(null);
    navigate("/login"); // redirect to login
  };

  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "10px" }}>
        Home
      </Link>

      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/notes" style={{ marginRight: "10px" }}>
            Notes
          </Link>
          {user && (
            <span style={{ marginRight: "10px" }}>
              👋 Welcome, <b>{user.name}</b>
            </span>
          )}
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
