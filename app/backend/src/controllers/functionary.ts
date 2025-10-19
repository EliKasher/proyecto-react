import express from "express";
import bcrypt from "bcrypt";
import FunctionaryModel from "../models/functionary";
import { authenticate, requireRole } from "./roles";

const functionaryRouter = express.Router();

functionaryRouter.get("/", authenticate, requireRole(['functionary']), async (request, response) => {
    try {
        const functionaries = await FunctionaryModel.find({});

        response.status(201).json(functionaries);
    } catch (error) {
        // to be replaced to middleware call
        response.status(400).json(error);
    }
});

functionaryRouter.get("/:id", authenticate, requireRole(['functionary']), async (request, response) => {
    try {
        const teacher = await FunctionaryModel.findById(request.params.id)

        response.status(201).json(teacher)
    } catch (error) {
        // to be replaced to middleware call
        response.status(400).json(error);
    }
});

functionaryRouter.post("/", authenticate, requireRole(['functionary']), async (request, response, next) => {
    try {
        const {
            rut,
            first_name,
            last_name,
            email,
            password,
        } = request.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new FunctionaryModel({
            rut: rut,
            email: email,
            password: passwordHash,
            first_name: first_name,
            last_name: last_name,
        });

        const newTeacher = await user.save();

        response.status(201).json(newTeacher);
    } catch (error) {
        // to be replaced to middleware call
        next(error);
    }
});

export default functionaryRouter;
