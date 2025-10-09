import express from "express";
import courseDatesModel from "../models/courseDates";

const coursesDatesRouter = express.Router();

coursesDatesRouter.get("/", (request, response) => {
    courseDatesModel.find({}).then((dates) =>
        response.json(dates)
    );
})

export default coursesDatesRouter;
