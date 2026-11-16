import Document from "../models/documentModel.js";
import AppError from "../utils/AppError.js";

const createDocument = async (data, userId) => {
	const document = await Document.create({
		...data,
		ownerId: userId,
	});

	return document;
};

const getMyDocuments = async (userId) => {
	return Document.find({
		ownerId: userId,
	}).sort({ createdAt: -1 });
};

const getDocumentById = async (documentId, userId) => {
	const document = await Document.findOne({
		_id: documentId,
		ownerId: userId,
	});

	if (!document) {
		throw new AppError("Document not found", 404);
	}

	return document;
};

export { createDocument, getMyDocuments, getDocumentById };
