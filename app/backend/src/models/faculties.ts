import config from "../utils/config";

import mongoose, { Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
    mongoose.connect(uri).catch((error) => {
        console.log("error connecting to MongoDB", error.message);
    });
}

const facultiesSchema = new mongoose.Schema({
    name: String,
});

const FacultiesModel = mongoose.model("faculties", facultiesSchema);

facultiesSchema.set("toJSON", {
    transform: (
        document,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default FacultiesModel;
