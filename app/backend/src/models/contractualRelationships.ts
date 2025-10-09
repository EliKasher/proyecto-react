import config from "../utils/config";

import mongoose, { mongo, Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
    mongoose.connect(uri).catch((error) => {
        console.log("error connecting to MongoDB", error.message);
    });
}

const contractualRelationshipSchema = new mongoose.Schema({
    relation: String,
    requirements: Array<String>
});

const ContractualRelationshipsModel = mongoose.model("contractual_relationships", contractualRelationshipSchema);

contractualRelationshipSchema.set("toJSON", {
    transform: (
        document,
        returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
    ) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default ContractualRelationshipsModel;
