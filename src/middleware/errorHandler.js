const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	// Log unexpected errors internally
	if (!err.isOperational) {
		console.error(err);
	}

	const response = {
		success: false,
		status: err.status || "error",
		message: err.isOperational ? err.message : "Internal Server Error",
	};

	// Include field-level errors when available
	if (err.errors) {
		response.errors = err.errors;
	}

	return res.status(statusCode).json(response);
};

export default errorHandler;
