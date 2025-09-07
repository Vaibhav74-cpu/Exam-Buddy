import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 text-center py-4 mt-12">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-400">ExamBuddy</span>. 
        All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
