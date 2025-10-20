import express from "express";
import CoursesModel from "../models/course";
import { authenticate, requireRole } from "./roles";
import TeachersModel from "../models/teacher";

const coursesRouter = express.Router();

coursesRouter.get("/", authenticate, requireRole(['teacher', 'functionary']), (request, response) => {
    CoursesModel.find({}).then((courses) =>
        response.json(courses)
    );
})

coursesRouter.post("/", authenticate, requireRole(['teacher']), (request, response) => {
    const req_course_data = request.body;

    console.log(req_course_data);

    const newCourse = new CoursesModel({
        course_data: req_course_data.course_data,
        program_content: req_course_data.program_content,
        weekly_planification: req_course_data.weekly_planification,
        teacher: req_course_data.teachers_data,
        staff: req_course_data.staff,
        materials: req_course_data.materials

    })

    newCourse.save().then((course) => {
        response.status(201).json(course).redirect("/")
    })
})

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
