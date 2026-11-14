import AppError from "../utils/AppError.js";

const getDocument = async (req, res) => {
	// Simulate database operation
	const document = await new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error("Database connection failed"));
		}, 1000);
	});

	return res.status(200).json({
		success: true,
		data: document,
	});
};

export { getDocument };
