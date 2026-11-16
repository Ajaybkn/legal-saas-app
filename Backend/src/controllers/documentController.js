import { createDocument, getMyDocuments, getDocumentById } from "../services/documentService.js";

const create = async (req, res) => {
	const document = await createDocument(req.validatedBody, req.user.id);

	return res.status(201).json({
		success: true,
		message: "Document created successfully",
		data: document,
	});
};

const getMine = async (req, res) => {
	const documents = await getMyDocuments(req.user.id);

	return res.status(200).json({
		success: true,
		results: documents.length,
		data: documents,
	});
};

const getOne = async (req, res) => {
	const document = await getDocumentById(req.params.id, req.user.id);

	return res.status(200).json({
		success: true,
		data: document,
	});
};

export { create, getMine, getOne };
