import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FunctionaryModel from "../models/functionary";
import config from "../utils/config";
import TeachersModel from "../models/teacher";
import { authenticate } from "./roles";

const loginRouter = express.Router();

loginRouter.post("/functionary", async (request, response, next) => {
  try {
    const { rut, password } = request.body;

    const functionary = await FunctionaryModel.findOne({ rut: rut });

    if (functionary) {
      const passwordCorrect = await bcrypt.compare(
        password,
        functionary.password
      );

      if (!passwordCorrect) {
        response.status(401).json({ error: "invalid rut or password" });
      } else {
        const functionaryForToken = {
          rut: functionary.rut,
          roles: functionary.roles,
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
    } else {
      response.status(401).json({ error: "invalid rut or password" });
    }
  } catch (error) {
    next(error);
  }
});

loginRouter.post("/teacher", async (request, response, next) => {
  try {
    const { rut, password } = request.body;

    const teacher = await TeachersModel.findOne({ rut: rut });

    if (teacher) {
      const passwordCorrect = await bcrypt.compare(password, teacher.password);

      if (!passwordCorrect) {
        response.status(401).json({ error: "invalid rut or password" });
      } else {
        const teacherForToken = {
          rut: teacher.rut,
          roles: teacher.roles,
          csrf: crypto.randomUUID(),
          id: teacher._id,
        };

        const token = jwt.sign(teacherForToken, config.JWT_SECRET);
        response.setHeader("X-CSRF-Token", teacherForToken.csrf);
        response.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: true,
        });
        response.status(200).json(teacher);
      }
    } else {
      response.status(401).json({ error: "invalid rut or password" });
    }
  } catch (error) {
    next(error);
  }
});

loginRouter.post("/restore", authenticate, async (request, response, next) => {
  try {
    let rol = request.roles;

    let user;

    switch (rol) {
      case "teacher":
        user = await TeachersModel.findById(request.userId);
        response.status(200).json(user);
        break;
      case "functionary":
        user = await FunctionaryModel.findById(request.userId);
        response.status(200).json(user);
        break;
      default:
        console.log("Unmatched case: ", rol);
        response.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
