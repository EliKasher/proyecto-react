import express from "express";
import CoursesModel from "../models/course";

const coursesRouter = express.Router();

coursesRouter.get("/", (request, response) => {
    CoursesModel.find({}).then((courses) =>
        response.json(courses)
    );
})

coursesRouter.post("/", (request, response) => {

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

export default coursesRouter;
