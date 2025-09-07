// backend/routes/questionRoutes.js
import express from "express";
import Question from "../models/Question.js";
import Exam from "../models/Exam.js";
import Result from "../models/Result.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Add question(s) to an exam
 * POST /api/exams/:examId/questions
 * Protected (teacher)
 * Accepts single question or array of questions in body
 */
router.post("/:examId/questions", protect, async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Optionally restrict to teacher who created the exam
    // if (exam.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    const payload = req.body; // could be single object or array
    const questionsToCreate = Array.isArray(payload) ? payload : [payload];

    const created = [];
    for (const q of questionsToCreate) {
      if (!q.text || !q.options || typeof q.correctAnswer !== "number") {
        return res.status(400).json({ message: "Invalid question format" });
      }
      const question = new Question({
        exam: examId,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        marks: q.marks || 1,
        createdBy: req.user?._id,
      });
      const saved = await question.save();
      created.push(saved);
    }

    res.status(201).json({ created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add question(s)", error: err.message });
  }
});

/**
 * Get questions for an exam (for students)
 * GET /api/exams/:examId/questions
 * Returns questions WITHOUT correctAnswer
 */
router.get("/:examId/questions", async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await Question.find({ exam: examId }).select(
      "-correctAnswer -createdBy -__v"
    );
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

/**
 * Submit exam answers and grade
 * POST /api/exams/:examId/submit
 * Protected (student must be logged in)
 */
router.post("/:examId/submit", protect, async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers, durationSeconds } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers must be an array" });
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    let totalMarks = 0;
    const qMap = {};
    for (const q of questions) {
      qMap[q._id.toString()] = q;
      totalMarks += q.marks || 1;
    }

    let obtained = 0;
    const answersDetailed = [];

    for (const a of answers) {
      const q = qMap[a.questionId];
      if (!q) {
        answersDetailed.push({
          question: a.questionId,
          selectedOption: a.selectedOption,
          correct: false,
          marksAwarded: 0,
        });
        continue;
      }

      const isCorrect = Number(a.selectedOption) === Number(q.correctAnswer);
      const marksAwarded = isCorrect ? (q.marks || 1) : 0;
      if (isCorrect) obtained += marksAwarded;

      answersDetailed.push({
        question: q._id,
        selectedOption: a.selectedOption,
        correct: isCorrect,
        marksAwarded,
      });
    }

    const percentage = totalMarks === 0 ? 0 : (obtained / totalMarks) * 100;
    const passed = percentage >= 40;

    const result = new Result({
      exam: examId,
      student: req.user._id,
      answers: answersDetailed,
      totalMarks,
      obtainedMarks: obtained,
      percentage,
      passed,
      durationSeconds,
    });

    const savedResult = await result.save();

    res.status(201).json({
      message: "Exam submitted successfully",
      result: {
        id: savedResult._id,
        totalMarks,
        obtained,
        percentage,
        passed,
        answers: answersDetailed,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit exam", error: err.message });
  }
});

/**
 * Get result by ID
 * GET /api/exams/:examId/results/:resultId
 */
router.get("/:examId/results/:resultId", protect, async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await Result.findById(resultId)
      .populate("student", "name email")
      .populate("answers.question", "text options correctAnswer");

    if (!result) return res.status(404).json({ message: "Result not found" });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch result" });
  }
});

export default router;
