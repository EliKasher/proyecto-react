import config from "../utils/config";

import mongoose, { mongo, Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
  mongoose.connect(uri).catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });
}

const CourseStartSchema = new mongoose.Schema(
  {
    start_date: String,
    end_date: String,
    start_month: String,
    end_month: String,
  },
  { _id: false }
);

const CourseDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nombre del curso es obligatorio.\n"],
      validate: {
        validator: (v: string) => v.length > 3,
        message: "Nombre del curso debe ser de al menos 3 carácteres.\n",
      },
    },
    faculty: {
      type: String,
      required: [
        true,
        "La facultad donde se va a realizar el curso es obligatoria.\n",
      ],
    },
    educational_level: {
      type: [String],
      required: [true, "Se debe seleccionar al menos un nivel educativo.\n"],
      validate: {
        validator: (arr: String[]) => arr.length > 0,
        message: "Se debe seleccionar al menos un nivel educativo.\n",
      },
    },
    quota: {
      type: Number,
      required: [true, "El cupo del curso es obligatorio.\n"],
      validate: {
        validator: (v: Number) => Number(v) > 24,
        message: "El cupo minimo del curso debe ser de 25.\n",
      },
    },
    course_start: {
      type: [CourseStartSchema],
      required: [
        true,
        "Se debe seleccionar al menos una fecha ideal de implementación.\n",
      ],
      validate: {
        validator: (arr: {
          start_date: String;
          end_date: String;
          start_month: String;
          end_month: String;
        }) => Array.isArray(arr) && arr.length > 0,
        message:
          "Se debe seleccionar al menos una fecha ideal de implementación.\n",
      },
    },
  },
  { _id: false }
);

const programContentSchema = new mongoose.Schema(
  {
    course_purpose: {
      type: String,
      required: [true, "El contenido del programa es obligatorio.\n"],
    },
    learning_objectives: {
      type: Array<String>,
      validate: {
        validator: (v: Array<String>) => v.length > 0,
        message: "El curso debe tener al menos un objetivo.\n",
      },
    },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema({
  course_data: {
    type: CourseDataSchema,
    required: true,
  },
  program_content: programContentSchema,
  weekly_planification: {
    type: Array<{
      day: Number;
      first_period: String;
      first_classroom: String;
      second_period: String;
      second_classroom: String;
    }>,
    validate: {
      validator: (
        v: Array<{
          day: Number;
          first_period: String;
          first_classroom: String;
          second_period: String;
          second_classroom: String;
        }>
      ) => {
        if (!v) {
          return false;
        }

        for (let i = 0; i < v.length; i++) {
          if (
            !v[i]?.first_classroom ||
            !v[i]?.second_classroom ||
            !v[i]?.first_period ||
            !v[i]?.second_period ||
            (v[i]?.first_period.length === 0 &&
              v[i]?.first_classroom.length === 0 &&
              v[i]?.second_classroom.length === 0 &&
              v[i]?.second_period.length === 0)
          ) {
            return false;
          }
        }
        return true;
      },
      message:
        "La programación semanal se encuentra incompleta; cada periodo debe tener una descripción y una sala deseada.\n",
    },
  },
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
  state: {
    // 1 = valid and saved // 0 = incomplete
    type: Number,
    required: true,
  },
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
