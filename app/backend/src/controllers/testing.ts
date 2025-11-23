import express from "express";
import * as Models from "../models"

const router = express.Router();
router.post("/reset", async (request, response) => {
    //se eliminan todas las modelos para testing
    Models.Course.deleteMany();
    Models.Functionary.deleteMany();
    Models.Teacher.deleteMany();
    Models.Documents.deleteMany();
    response.status(204).end();
});
export default router;