import config from "../utils/config";

import mongoose, { mongo, Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
    mongoose.connect(uri).catch((error) => {
        console.log("error connecting to MongoDB", error.message);
    });
}

const documentschema = new mongoose.Schema({
    short_name: String,
    full_name: String,
    note: {
        type: String,
        required: false
    }
});

const DocumentsModel = mongoose.model("documents", documentschema);

documentschema.set("toJSON", {
    transform: (
        document,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default DocumentsModel;
