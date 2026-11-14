import express from "express";
import { register } from "../controllers/authController.js";
import validate from "../middleware/validate.js";
import { createUserSchema } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), register);

export default router;
