import express from "express";
import EducationalLevelsModel from "../models/educationalLevels";
import { authenticate, requireRole } from "./roles";

const educationalLevelsRouter = express.Router();

educationalLevelsRouter.get("/", authenticate, requireRole(['teacher', 'functionary']), (request, response) => {
    EducationalLevelsModel.find({}).then((levels) =>
        response.json(levels)
    );
})

export default educationalLevelsRouter;
