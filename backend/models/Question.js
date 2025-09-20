
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    text: { type: String, required: true },
    // options: array of strings
    options: [
      {
        type: String,
        required: true,
      },
    ],
    // correctAnswer: index of options array (0,1,2,3) OR store the actual string.
    correctAnswer: {
      type: Number,
      required: true,
    },
    marks: {
      type: Number,
      default: 1,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
