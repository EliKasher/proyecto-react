import express from "express";
import * as Models from "../models"

const router = express.Router();
router.post("/reset", async (request, response) => {
    try {
        await Models.Course.deleteMany({});
        await Models.Functionary.deleteMany({});
        await Models.Teacher.deleteMany({});
        await Models.Documents.deleteMany({});

        response.status(204).end();
    } catch (error) {
        console.error("Error deleting collections:", error);
        response.status(500).json({ error: "Error deleting collections" });
    }
});
export default router;