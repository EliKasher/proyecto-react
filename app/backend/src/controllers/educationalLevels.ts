import express from "express";
import EducationalLevelsModel from "../models/educationalLevels";
import { authenticate, requireRole } from "./roles";

const educationalLevelsRouter = express.Router();

educationalLevelsRouter.get(
  "/",
  authenticate,
  requireRole(["teacher", "functionary"]),
  async (request, response) => {
    const levels = await EducationalLevelsModel.find({});

    response.json(levels);
  }
);

export default educationalLevelsRouter;
