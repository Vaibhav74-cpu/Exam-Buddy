// backend/models/Result.js
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  selectedOption: { type: Number, required: true }, // index
  correct: { type: Boolean },
  marksAwarded: { type: Number, default: 0 },
});

const resultSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: [answerSchema],
    totalMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
    percentage: { type: Number },
    passed: { type: Boolean },
    durationSeconds: { type: Number }, // optional time taken
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
