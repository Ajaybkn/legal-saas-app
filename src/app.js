import express from "express";
import { getDocument } from "./controllers/documentController.js";
import { createDocumentSchema } from "./validators/documentValidator.js";
// Middleware imports
import requestLogger from "./middleware/requestLogger.js";
import requestTimer from "./middleware/requestTimer.js";
import errorHandler from "./middleware/errorHandler.js";
import validate from "./middleware/validate.js";

// Utility imports
import AppError from "./utils/AppError.js";

// Initialize Express application
const app = express();

// 1. Global middleware
app.use(express.json());
app.use(requestLogger);
app.use(requestTimer);

// 2. Health check route
app.get("/health", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Legal SaaS API is running",
	});
});
app.post("/api/documents", validate(createDocumentSchema), (req, res) => {
	return res.status(201).json({
		success: true,
		message: "Document created",
		data: req.validatedBody,
	});
});
// 3. Test document route
app.get("/api/documents/:id", getDocument);
app.get("/test", async (req, res) => {
	const result = await someDatabaseOperation();

	res.json(result);
});
// 4. Handle undefined routes
app.use((req, res, next) => {
	return next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// 5. Centralized error handler
app.use(errorHandler);

// Export application
export default app;
