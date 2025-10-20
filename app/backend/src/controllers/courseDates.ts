import express from "express";
import courseDatesModel from "../models/courseDates";
import { authenticate, requireRole } from "./roles";

const coursesDatesRouter = express.Router();

coursesDatesRouter.get("/", authenticate, requireRole(['teacher', 'functionary']), async (request, response) => {

    const dates = await courseDatesModel.find({})
    response.json(dates)
})

export default coursesDatesRouter;
