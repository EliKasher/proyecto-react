import config from "../utils/config";

import mongoose, { Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

// if (uri) {
//   mongoose.connect(uri).catch((error) => {
//     console.log("error connecting to MongoDB", error.message);
//   });
// }

const facultiesSchema = new mongoose.Schema({
  name: String,
});

const FacultiesModel = mongoose.model("cursosEDV_faculties", facultiesSchema);

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

const initialFaculties = [
  { name: "Facultad de Ciencias Físicas y Matemáticas" },
  { name: "Facultad de Medicina" },
  { name: "Facultad de Economía y Negocios" },
  { name: "Facultad de Derecho" },
  { name: "Facultad de Ciencias Químicas y Farmacéuticas" },
  { name: "Facultad de Odontología" },
  { name: "Facultad de Gobierno" },
  { name: "Facultad de Ciencias Sociales" },
  { name: "Facultad de Filosofía y Humanidades" },
  { name: "Facultad de Ciencias Veterinarias y Pecuarias" },
  {
    name: "Facultad de Ciencias Forestales y de la Conservación de la Naturaleza",
  },
];

async function initializeFaculties() {
  try {
    await FacultiesModel.deleteMany({});
    for (const faculty of initialFaculties) {
      await FacultiesModel.create(faculty);
    }
  } catch (error: any) {
    console.error("Error initializing faculties:", error.message);
  }
}

initializeFaculties();

export default FacultiesModel;
