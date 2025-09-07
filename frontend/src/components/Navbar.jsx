
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          ExamBuddy 🚀
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link
            to="/"
            className="hover:text-blue-200 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/notes"
            className="hover:text-blue-200 font-medium transition-colors"
          >
            Notes
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-200 font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-blue-200 font-medium transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
