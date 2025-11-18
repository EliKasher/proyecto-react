import express from "express";
import ContractualRelationshipsModel from "../models/contractualRelationships";

const contractualRelationshipsRouter = express.Router();

contractualRelationshipsRouter.get("/", (request, response) => {
    ContractualRelationshipsModel.find({}).then((relations) =>
        response.json(relations)
    );
})

export default contractualRelationshipsRouter;
