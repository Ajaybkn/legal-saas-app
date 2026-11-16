import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/userModel.js";
const protect = async (req, res, next) => {
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
		const user = await User.findById(decoded.sub);
		if (!user || !user.isActive) {
			return next(new AppError("User account not found or inactive", 401));
		}
		// 5. Attach authenticated identity to request
		req.user = {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
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
