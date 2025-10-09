import config from "../utils/config";

import mongoose, { Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
    mongoose.connect(uri).catch((error) => {
        console.log("error connecting to MongoDB", error.message);
    });
}

const teachersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    rut: String,
    email: String,
    phone: String,
    degree: String,
    college_relationship: String
});

const TeachersModel  = mongoose.model("teachers", teachersSchema);

teachersSchema.set("toJSON", {
    transform: (
        document,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default TeachersModel;
