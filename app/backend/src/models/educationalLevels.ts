import config from "../utils/config";

import mongoose, { Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
  mongoose.connect(uri).catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });
}

const educationalLevelsSchema = new mongoose.Schema({
  level: String,
});

const EducationalLevelsModel = mongoose.model(
  "educational_levels",
  educationalLevelsSchema
);

educationalLevelsSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const initialEducationalLevels = [
//   { level: "1" },
//   { level: "2" },
//   { level: "3" },
//   { level: "4" },
//   { level: "5" },
//   { level: "6" },
//   { level: "7" },
//   { level: "8" },
//   { level: "I" },
//   { level: "II" },
//   { level: "III" },
//   { level: "IV" },
// ];

// async function initializeEducationalLevels() {
//   try {
//     for (const lvl of initialEducationalLevels) {
//       const exists = await EducationalLevelsModel.findOne({ level: lvl.level });
//       if (!exists) {
//         await EducationalLevelsModel.create(lvl);
//         console.log(`Inserted educational level: ${lvl.level}`);
//       } else {
//         console.log(`Educational level already exists: ${lvl.level}`);
//       }
//     }
//   } catch (error: any) {
//     console.error("Error initializing educational levels:", error.message);
//   }
// }

// initializeEducationalLevels();

export default EducationalLevelsModel;
