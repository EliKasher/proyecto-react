import express from "express";
import DocumentsModel from "../models/documents";
import { authenticate, requireRole } from "./roles";

const documentsRouter = express.Router();

documentsRouter.get("/", authenticate, requireRole(['teacher', 'functionary']), (request, response) => {
    DocumentsModel.find({}).then((docs) =>
        response.json(docs)
    );
})

export default documentsRouter;
