import config from "../utils/config";

import mongoose, { mongo, Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
    mongoose.connect(uri).catch((error) => {
        console.log("error connecting to MongoDB", error.message);
    });
}

const courseSchema = new mongoose.Schema({
    course_data: {
        name: String,
        faculty: String,
        //educational_level: Array<{
        //type: mongoose.Types.ObjectId;
        //ref: "EducationalLevels";
        //}>,
        educational_level: Array<String>,
        quota: Number,
        //course_start: Array<{
        //type: mongoose.Types.ObjectId;
        // ref: "CourseDates";
        //}>,
        course_start: Array<{
            start_date: String;
            end_date: String;
            start_month: String;
            end_month: String;
        }>,
    },
    program_content: {
        course_purpose: String,
        learning_objectives: Array<String>,
    },
    weekly_planification: Array<{
        day: Number;
        first_period: String;
        first_classroom: String;
        second_period: String;
        second_classroom: String;
    }>,
    teacher: {
        first_name: String,
        last_name: String,
        rut: String,
        email: String,
        phone: String,
        degree: String,
        college_relationship: String,
    },
    staff: Array<{
        first_name: String;
        last_name: String;
        rut: String;
        email: String;
        phone: String;
        position: String;
    }>,
    materials: Array<{
        name: String;
        quantity: Number;
        link: String;
    }>,
});

const CoursesModel = mongoose.model("courses", courseSchema);

courseSchema.set("toJSON", {
    transform: (
        document,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default CoursesModel;
