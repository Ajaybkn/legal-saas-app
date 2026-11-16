import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
const registerUser = async ({ name, email, password }) => {
	// 1. Normalize email
	const normalizedEmail = email.trim().toLowerCase();

	// 2. Check for existing user
	const existingUser = await User.findOne({
		email: normalizedEmail,
	});

	if (existingUser) {
		throw new AppError("Email is already registered", 409);
	}

	// 3. Hash password
	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		// 4. Create user
		const user = await User.create({
			name,
			email: normalizedEmail,
			password: hashedPassword,
		});

		// 5. Return safe user data
		return {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
		};
	} catch (error) {
		// Handle duplicate email race condition
		if (error.code === 11000) {
			throw new AppError("Email is already registered", 409);
		}

		throw error;
	}
};

const loginUser = async ({ email, password }) => {
	// 1. Normalize email
	const normalizedEmail = email.trim().toLowerCase();

	// 2. Find user and explicitly include password hash
	const user = await User.findOne({
		email: normalizedEmail,
	}).select("+password");

	// 3. Verify credentials
	if (!user) {
		throw new AppError("Invalid email or password", 401);
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw new AppError("Invalid email or password", 401);
	}

	// 4. Check account status
	if (!user.isActive) {
		throw new AppError("Your account is inactive", 403);
	}

	// 5. Generate JWT
	const token = jwt.sign(
		{
			role: user.role,
		},
		process.env.JWT_SECRET,
		{
			subject: user._id.toString(),
			expiresIn: process.env.JWT_EXPIRES_IN || "15m",
		}
	);

	// 6. Return token and safe user information
	return {
		token,
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		},
	};
};

export { registerUser, loginUser };
