import express from "express";
import FacultiesModel from "../models/faculties";

const facultiesRouter = express.Router();

facultiesRouter.get("/", (request, response) => {
    FacultiesModel.find({}).then((faculties) =>
        response.json(faculties)
    );
})

export default facultiesRouter;
