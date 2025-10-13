import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TeachersModel from "../models/teacher";
import config from "../utils/config";

const teacherLoginRouter = express.Router();

teacherLoginRouter.post("/", async (request, response) => {
    try {
        const { rut, password } = request.body;

        const teacher = await TeachersModel.findOne({ rut: rut });

        if (teacher) {
            const passwordCorrect = await bcrypt.compare(password, teacher.password);

            if (!passwordCorrect) {
                response.status(401).json({ error: "invalid username or password" });
            } else {
                const teacherForToken = {
                    rut: teacher.rut,
                    csrf: crypto.randomUUID(),
                    id: teacher._id,
                };

                const token = jwt.sign(teacherForToken, config.JWT_SECRET);
                response.setHeader("X-CSRF-Token", teacherForToken.csrf);
                response.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });
                response.status(200).json(teacher);
            }
        }
    } catch (error) {
        // to be replaced to middleware call
        response.status(400).json(error);
    }
});

export default teacherLoginRouter;
