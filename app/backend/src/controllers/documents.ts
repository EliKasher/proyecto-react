import express from "express";
import DocumentsModel from "../models/documents";

const documentsRouter = express.Router();

documentsRouter.get("/", (request, response) => {
    DocumentsModel.find({}).then((docs) =>
        response.json(docs)
    );
})

export default documentsRouter;
