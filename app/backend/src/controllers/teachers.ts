import express from "express";
import TeachersModel from "../models/teachers";

const teachersRouter = express.Router();

teachersRouter.get("/", (request, response) => {
    TeachersModel.find({}).then((teachers) =>
        response.json(teachers)
    );
})

export default teachersRouter;
