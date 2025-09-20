

// frontend/src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Called when we dispatch window.dispatchEvent(new Event('authChange'))
    const onAuthChange = () => setIsLoggedIn(!!localStorage.getItem("token"));

    // Storage event for changes in other tabs/windows
    const onStorage = (e) => {
      if (e.key === "token") {
        setIsLoggedIn(!!e.newValue);
      }
    };

    window.addEventListener("authChange", onAuthChange);
    window.addEventListener("storage", onStorage);

    // cleanup
    return () => {
      window.removeEventListener("authChange", onAuthChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // notify other components in same tab
    window.dispatchEvent(new Event("authChange"));
    // navigate to login
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          ExamBuddy 🚀
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="hover:text-blue-200 font-medium transition-colors">
            Home
          </Link>

          <Link to="/notes" className="hover:text-blue-200 font-medium transition-colors">
            Notes
          </Link>

          <Link to="/create-exam" className="hover:text-blue-200 font-medium transition-colors">
            Create Exam
          </Link>

          <Link to="/add-question" className="hover:text-blue-200 font-medium transition-colors">
            Add Question
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-blue-200 font-medium transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200 font-medium transition-colors">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium shadow-md transition"
            >
              🚪 Logout
            </button>
          )}
        </div>

        {/* Mobile Menu (minimal) */}
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
