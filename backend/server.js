
// backend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

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

// ✅ Allow frontend requests
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust if frontend runs elsewhere
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static uploads folder
app.use("/uploads", express.static(uploadsDir));

// ✅ Health check
app.get("/api/ping", (req, res) => {
  res.json({ message: "ExamBuddy API is running 🚀" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/notes", noteRoutes);

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
