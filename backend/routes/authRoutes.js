

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
// import authMiddleware from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected route (only accessible with valid token)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile 🚀",
    user: req.user,
  });
});

export default router;
