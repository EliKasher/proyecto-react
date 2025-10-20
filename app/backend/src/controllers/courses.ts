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

      await TeachersModel.findByIdAndUpdate(request.userId, {
        $push: { courses: course._id },
      });

      response.status(201).json(course);
    } catch (error) {
      next(error);
    }
  }
);

export default coursesRouter;
