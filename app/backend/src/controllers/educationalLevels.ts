import express from "express";
import EducationalLevelsModel from "../models/educationalLevels";
import e from "express";

const educationalLevelsRouter = express.Router();

educationalLevelsRouter.get("/", (request, response) => {
    EducationalLevelsModel.find({}).then((levels) =>
        response.json(levels)
    );
})

export default educationalLevelsRouter;
