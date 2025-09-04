

// backend/routes/noteRoutes.js
import express from "express";
import multer from "multer";
import Note from "../models/Note.js";
import { protect } from "../middleware/authMiddleware.js";
import fs from "fs";

const router = express.Router();

// ✅ Configure Multer for file uploads (store in /uploads folder)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * @route   POST /api/notes
 * @desc    Upload note (Only logged in teacher)
 * @access  Private
 */
router.post("/", protect, upload.single("noteFile"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const note = await Note.create({
      title,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload note", error: err.message });
  }
});

/**
 * @route   GET /api/notes
 * @desc    List all notes
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().populate("uploadedBy", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err.message });
  }
});

/**
 * @route   GET /api/notes/:id
 * @desc    Get single note by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("uploadedBy", "name email");
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch note", error: err.message });
  }
});

/**
 * @route   PUT /api/notes/:id
 * @desc    Update note (title/description only, not file)
 * @access  Private (only uploader)
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    // Only uploader can update
    if (note.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this note" });
    }

    note.title = req.body.title || note.title;
    note.description = req.body.description || note.description;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
});

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete note (only uploader)
 * @access  Private
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    // Only uploader can delete
    if (note.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this note" });
    }

    // Delete file from uploads folder
    if (note.fileUrl) {
      const filePath = `.${note.fileUrl}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note", error: err.message });
  }
});

export default router;
