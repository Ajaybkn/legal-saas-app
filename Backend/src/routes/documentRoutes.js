import express from "express";

import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import { createDocumentSchema } from "../validators/documentValidator.js";

import { create, getMine, getOne } from "../controllers/documentController.js";

const router = express.Router();

router.use(protect);

router.post("/", validate(createDocumentSchema), create);

router.get("/my", getMine);

router.get("/:id", getOne);

export default router;
