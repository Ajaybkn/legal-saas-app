import { registerUser } from "../services/authService.js";

const register = async (req, res) => {
	const user = await registerUser(req.validatedBody);

	return res.status(201).json({
		success: true,
		message: "User registered successfully",
		data: user,
	});
};

export { register };
