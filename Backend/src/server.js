import "dotenv/config";
console.log("MongoDB URI loaded:", Boolean(process.env.MONGODB_URI));
import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await connectDB();

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Server startup failed:", error);
		process.exit(1);
	}
};

startServer();
