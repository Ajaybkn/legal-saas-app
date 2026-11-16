import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const protect = (req, res, next) => {
	try {
		// 1. Read Authorization header
		const authHeader = req.headers.authorization;

		// 2. Check whether token exists
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return next(new AppError("Authentication required. Please log in.", 401));
		}

		// 3. Extract token
		const token = authHeader.split(" ")[1];

		// 4. Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });

		// 5. Attach authenticated identity to request
		req.user = {
			id: decoded.sub,
			role: decoded.role,
		};

		// 6. Continue to next handler
		return next();
	} catch (error) {
		if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError" || error.name === "NotBeforeError") {
			return next(new AppError("Invalid or expired authentication token", 401));
		}

		return next(error);
	}
};

export default protect;
