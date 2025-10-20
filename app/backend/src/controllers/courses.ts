import express from "express";
import CoursesModel from "../models/course";
import { authenticate, requireRole } from "./roles";
import TeachersModel from "../models/teacher";

const coursesRouter = express.Router();

coursesRouter.get(
  "/",
  authenticate,
  requireRole(["teacher", "functionary"]),
  async (request, response) => {
    CoursesModel.find({}).then((courses) => response.json(courses));
  }
);

coursesRouter.post(
  "/",
  authenticate,
  requireRole(["teacher"]),
  async (request, response, next) => {
    try {
      const req_course_data = request.body;

      const teacher = await TeachersModel.findById(request.userId);

      if (!teacher) {
        response.status(401).json({ error: "Invalid user" });
        return;
      }

      const newCourse = new CoursesModel({
        course_data: req_course_data.course_data,
        program_content: req_course_data.program_content,
        weekly_planification: req_course_data.weekly_planification,
        teacher: {
          first_name: teacher.first_name,
          last_name: teacher.last_name,
          rut: teacher.rut,
          email: teacher.email,
          phone: teacher.phone,
          degree: teacher.degree,
          college_relationship: teacher.college_relationship,
        },
        staff: req_course_data.staff,
        materials: req_course_data.materials,
      });

      const course = await newCourse.save();
      response.status(201).json(course);
    } catch (error) {
      next(error);
    }
  }
);

coursesRouter.get("/:id", authenticate, requireRole(["teacher", "functionary"]), async (request, response) => {
  try {
    const { id } = request.params;
    const user = await TeachersModel.findById(id);
    if (!user) return response.status(404).json({ error: "Usuario no encontrado" });
    const { rut } = user;
    const courses = await CoursesModel.find({ teacherRut: rut });
    return response.json(courses);
  } catch (error) {
    return response.status(500).json({ error: "Error al obtener los cursos" });
  }
});

export default coursesRouter;
