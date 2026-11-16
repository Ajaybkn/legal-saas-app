import { registerUser, loginUser } from "../services/authService.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
const register = async (req, res) => {
	const user = await registerUser(req.validatedBody);

	return res.status(201).json({
		success: true,
		message: "User registered successfully",
		data: user,
	});
};

const login = async (req, res) => {
	const result = await loginUser(req.validatedBody);

	return res.status(200).json({
		success: true,
		message: "Login successful",
		data: result,
	});
};

const getMe = async (req, res) => {
	// Fetch the latest user information from MongoDB
	const user = await User.findById(req.user.id);

	if (!user || !user.isActive) {
		throw new AppError("User account not found or inactive", 401);
	}

	return res.status(200).json({
		success: true,
		message: "User profile fetched successfully",
		data: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
		},
	});
};
const getAllUsers = async (req, res) => {
	const users = await User.find().select("name email role isActive createdAt");

	return res.status(200).json({
		success: true,
		message: "Users fetched successfully",
		results: users.length,
		data: users,
	});
};
export { register, login, getMe, getAllUsers };
