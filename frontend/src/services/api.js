const API_URL = "http://localhost:5000/api";

// Helper function to add token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Auth APIs
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const register = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

// Exam APIs
export const createExam = async (title, description, durationMinutes) => {
  const res = await fetch(`${API_URL}/exams`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description, durationMinutes }),
  });
  return res.json();
};

export const addQuestion = async (examId, question) => {
  const res = await fetch(`${API_URL}/exams/${examId}/questions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(question),
  });
  return res.json();
};

export const getExams = async () => {
  const res = await fetch(`${API_URL}/exams`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};
