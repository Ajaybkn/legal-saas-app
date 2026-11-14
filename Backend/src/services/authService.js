import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

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

export { registerUser };
