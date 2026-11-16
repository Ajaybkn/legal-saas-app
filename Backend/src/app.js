import express from "express";
// Middleware imports
import requestLogger from "./middleware/requestLogger.js";
import requestTimer from "./middleware/requestTimer.js";
import errorHandler from "./middleware/errorHandler.js";
import validate from "./middleware/validate.js";
import documentRoutes from "./routes/documentRoutes.js";
// Routes
import authRoutes from "./routes/authRoutes.js";

// Utility imports
import AppError from "./utils/AppError.js";

// Initialize Express application
const app = express();

// 1. Global middleware
app.use(express.json());
app.use(requestLogger);
app.use(requestTimer);
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
// 2. Health check route
app.get("/health", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Legal SaaS API is running",
	});
});

// 4. Handle undefined routes
app.use((req, res, next) => {
	return next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// 5. Centralized error handler
app.use(errorHandler);

// Export application
export default app;
