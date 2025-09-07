// backend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// ✅ Import Routes
import authRoutes from "./routes/authRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import examQuestionRoutes from "./routes/questionRoutes.js"; // ⬅️ NEW

dotenv.config();

const app = express();

// ✅ Resolve __dirname (since we’re using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📂 uploads folder created");
}

// ✅ Allow frontend requests (CORS)
app.use(
  cors({
    origin: "http://localhost:5173", // Change if frontend runs on another port
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploads as static files
app.use("/uploads", express.static(uploadsDir));

// ✅ Health check
app.get("/api/ping", (req, res) => {
  res.json({ message: "ExamBuddy API is running 🚀" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/exams", examQuestionRoutes); // ⬅️ NEW mount

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));
