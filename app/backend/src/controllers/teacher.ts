import express from "express";
import bcrypt from "bcrypt";
import TeachersModel from "../models/teacher";

const teachersRouter = express.Router();

teachersRouter.get("/", async (request, response) => {
    try {
        const teachers = await TeachersModel.find({});

        response.status(201).json(teachers);
    } catch (error) {
        // to be replaced to middleware call
        response.status(400).json(error);
    }
});

teachersRouter.get("/:id", async (request, response) => { 
    try {
        const teacher = await TeachersModel.findById(request.params.id)

        response.status(201).json(teacher)
    } catch (error) {
        // to be replaced to middleware call
        response.status(400).json(error);
    }
});

teachersRouter.post("/", async (request, response) => {
    try {
        const {
            first_name,
            last_name,
            email,
            rut,
            phone,
            degree,
            college_relationship,
            password,
        } = request.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new TeachersModel({
            rut: rut,
            email: email,
            password: passwordHash,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            degree: degree,
            college_relationship: college_relationship,
        });

        const newTeacher = await user.save();

        response.status(201).json(newTeacher);
    } catch (error) {
        // to be replaced to middleware call
        response.status(400).json(error);
    }
});

export default teachersRouter;
