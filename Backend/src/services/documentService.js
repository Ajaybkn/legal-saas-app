import Document from "../models/documentModel.js";
import AppError from "../utils/AppError.js";

const createDocument = async (data, user) => {
	const document = await Document.create({
		...data,
		ownerId: user.id,
		organizationId: user.organizationId,
	});

	return document;
};

const getMyDocuments = async (user) => {
	return Document.find({
		organizationId: user.organizationId,
		ownerId: user.id,
	}).sort({ createdAt: -1 });
};

const getDocumentById = async (documentId, user) => {
	const document = await Document.findOne({
		_id: documentId,
		organizationId: user.organizationId,
		ownerId: user.id,
	});

	if (!document) {
		throw new AppError("Document not found", 404);
	}

	return document;
};

export { createDocument, getMyDocuments, getDocumentById };
