import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		clientId: {
			type: String,
			required: true,
		},

		documentType: {
			type: String,
			enum: ["contract", "agreement", "notice"],
			required: true,
		},

		content: {
			type: String,
			default: "",
		},

		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
