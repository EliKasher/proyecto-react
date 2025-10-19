import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FunctionaryModel from "../models/functionary";
import config from "../utils/config";

const functionaryLoginRouter = express.Router();

functionaryLoginRouter.post("/", async (request, response, next) => {
    try {
        const { rut, password } = request.body;

        const functionary = await FunctionaryModel.findOne({ rut: rut });

        if (functionary) {
            const passwordCorrect = await bcrypt.compare(password, functionary.password);

            if (!passwordCorrect) {
                response.status(401).json({ error: "invalid rut or password" });
            } else {
                const functionaryForToken = {
                    rut: functionary.rut,
                    csrf: crypto.randomUUID(),
                    id: functionary._id,
                };

                const token = jwt.sign(functionaryForToken, config.JWT_SECRET);
                response.setHeader("X-CSRF-Token", functionaryForToken.csrf);
                response.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });
                response.status(200).json(functionary);
            }
        }
    } catch (error) {
        // to be replaced to middleware call
        next(error);
    }
});

export default functionaryLoginRouter;
