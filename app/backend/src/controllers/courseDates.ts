import express from "express";
import courseDatesModel from "../models/courseDates";
import { authenticate, requireRole } from "./roles";

const coursesDatesRouter = express.Router();

coursesDatesRouter.get("/", authenticate, requireRole(['teacher', 'functionary']), (request, response) => {
    courseDatesModel.find({}).then((dates) =>
        response.json(dates)
    );
})

export default coursesDatesRouter;
