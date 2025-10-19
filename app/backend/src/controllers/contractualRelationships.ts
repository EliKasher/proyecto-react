import express from "express";
import ContractualRelationshipsModel from "../models/contractualRelationships";
import { authenticate, requireRole } from "./roles";

const contractualRelationshipsRouter = express.Router();

contractualRelationshipsRouter.get("/", authenticate, requireRole(['teacher', 'functionary']), (request, response) => {
    ContractualRelationshipsModel.find({}).then((relations) =>
        response.json(relations)
    );
})

export default contractualRelationshipsRouter;
