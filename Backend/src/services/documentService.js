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
	const filter = {
		organizationId: user.organizationId,
	};

	// Members can access only their own documents.
	// Admins can access all documents within their organization.
	if (user.role === "member") {
		filter.ownerId = user.id;
	}

	return Document.find(filter).sort({
		createdAt: -1,
	});
};

const getDocumentById = async (documentId, user) => {
	const filter = {
		_id: documentId,
		organizationId: user.organizationId,
	};

	// Members can access only their own documents.
	// Admins can access all documents in their organization.
	if (user.role === "member") {
		filter.ownerId = user.id;
	}

	const document = await Document.findOne(filter);

	if (!document) {
		throw new AppError("Document not found", 404);
	}

	return document;
};
const updateDocument = async (documentId, data, user) => {
	const filter = {
		_id: documentId,
		organizationId: user.organizationId,
	};

	if (user.role === "member") {
		filter.ownerId = user.id;
	}

	const allowedUpdates = {};

	if (data.title !== undefined) {
		allowedUpdates.title = data.title;
	}

	if (data.description !== undefined) {
		allowedUpdates.description = data.description;
	}

	if (data.status !== undefined) {
		allowedUpdates.status = data.status;
	}

	const document = await Document.findOneAndUpdate(
		filter,
		{ $set: allowedUpdates },
		{
			new: true,
			runValidators: true,
		}
	);

	if (!document) {
		throw new AppError("Document not found", 404);
	}

	return document;
};
const deleteDocument = async (documentId, user) => {
	const filter = {
		_id: documentId,
		organizationId: user.organizationId,
	};

	if (user.role === "member") {
		filter.ownerId = user.id;
	}

	const document = await Document.findOneAndDelete(filter);

	if (!document) {
		throw new AppError("Document not found", 404);
	}

	return document;
};
export { createDocument, getMyDocuments, getDocumentById, updateDocument, deleteDocument };
