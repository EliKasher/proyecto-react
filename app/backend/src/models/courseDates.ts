import config from "../utils/config";

import mongoose, { Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
    mongoose.connect(uri).catch((error) => {
        console.log("error connecting to MongoDB", error.message);
    });
}

const courseDateSchema = new mongoose.Schema({
    start_date: Number,
    start_month: String,
    end_date: Number,
    end_month: String,
});

const courseDatesModel = mongoose.model("course_dates", courseDateSchema);

courseDateSchema.set("toJSON", {
    transform: (
        document,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default courseDatesModel;
