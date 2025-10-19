import express from "express";
import FacultiesModel from "../models/faculties";
import { authenticate, requireRole } from "./roles";

const facultiesRouter = express.Router();

facultiesRouter.get("/", authenticate, requireRole(['teacher', 'functionary']), (request, response) => {
    FacultiesModel.find({}).then((faculties) =>
        response.json(faculties)
    );
})

export default facultiesRouter;
