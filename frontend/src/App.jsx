
// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";

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
      <Footer></Footer>
    </Router>
  );
}

export default App;
