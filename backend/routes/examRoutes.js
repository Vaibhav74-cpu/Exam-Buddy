


import express from "express";
import Exam from "../models/Exam.js";
// import authMiddleware from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

//  Create Exam (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    const exam = await Exam.create({
      title,
      description,
      createdBy: req.user._id, // use _id from middleware
    });

    res.status(201).json(exam);
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ error: "Failed to create exam" });
  }
});

//  Get All Exams (Public)
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find().populate("createdBy", "name email");
    res.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
});

// Get Single Exam by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ error: "Failed to fetch exam" });
  }
});

export default router;
