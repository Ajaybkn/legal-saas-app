import express from "express";
import { register, login, getMe, getAllUsers } from "../controllers/authController.js";
import authorize from "../middleware/authorize.js";
import protect from "../middleware/authMiddleware.js";

import validate from "../middleware/validate.js";
import { createUserSchema, loginSchema } from "../validators/authValidator.js";
const router = express.Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", protect, getMe);
router.get("/admin/users", protect, authorize("admin"), getAllUsers);
export default router;
