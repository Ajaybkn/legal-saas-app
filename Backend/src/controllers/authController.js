import { registerUser, loginUser } from "../services/authService.js";

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

export { register, login };
