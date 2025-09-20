
import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    durationMinutes: { type: Number, default: 0 }, // optional
    // you can keep questions separate (Question model) or embed them here
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
