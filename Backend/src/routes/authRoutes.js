import express from "express";
import { register, login, getMe } from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

import validate from "../middleware/validate.js";
import { createUserSchema, loginSchema } from "../validators/authValidator.js";
const router = express.Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getMe);
export default router;
