
// backend/routes/noteRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/authMiddleware.js";
import Note from "../models/noteModel.js";

const router = express.Router();

// ✅ Multer storage (save in uploads folder with original filename + timestamp)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_") // remove spaces
    );
  },
});

const upload = multer({ storage });

// ✅ Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().populate("uploadedBy", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// ✅ Upload a new note (protected route)
router.post("/", protect, upload.single("noteFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const newNote = new Note({
      title: req.body.title,
      description: req.body.description,
      fileUrl: `/uploads/${req.file.filename}`, // ✅ Save file URL
      uploadedBy: req.user._id, // ✅ Get user from token
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error("Error uploading note:", err);
    res.status(500).json({ message: "Failed to upload note" });
  }
});

export default router;
