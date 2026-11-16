import { z } from "zod";

export const createDocumentSchema = z.object({
	title: z.string().trim().min(3, "Title must be at least 3 characters"),

	clientId: z.string().trim().min(1, "Client ID is required"),

	documentType: z.enum(["contract", "agreement", "notice"], {
		error: "Invalid document type",
	}),

	content: z.string().optional().default(""),
});
