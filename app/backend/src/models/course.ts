import config from "../utils/config";

import mongoose from "mongoose";
import courseDatesModel from "./courseDates";

import {
  urlValidation,
  validateEmail,
  validatePhone,
  validateRut,
} from "../utils/validators";

const uri = config.MONGODB_URI;

if (uri) {
  mongoose.connect(uri).catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });
}

const courseNameMaxLength = 40;
const courseNameMinLength = 5;

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
        validator: function (v: string) {
          const doc = this;
          let formState = 1;

          let save: any = doc;
          let parent = doc.$parent();

          if (typeof parent?.state === "number") {
            formState = parent?.state;
          }

          return (
            (v.length >= courseNameMinLength &&
              v.length <= courseNameMaxLength) ||
            (v.length === 0 && formState === 0)
          );
        },
        message: "Nombre del curso debe ser de al menos 3 carácteres.\n",
      },
    },
    faculty: {
      type: String,
      validate: {
        validator: function (v: string) {
          const doc = this;
          let formState = 1;

          let save: any = doc;
          let parent = doc.$parent();

          if (typeof parent?.state === "number") {
            formState = parent?.state;
          }

          return (formState === 0 && v.length === 0) || v.length > 0;
        },
        message:
          "La facultad donde se va a realizar el curso es obligatoria.\n",
      },
    },
    educational_level: {
      type: [String],
      required: [true, "Se debe seleccionar al menos un nivel educativo.\n"],
      validate: {
        validator: function (arr: string[]) {
          const doc = this;
          let formState = 1;

          let save: any = doc;
          let parent = doc.$parent();

          if (parent !== undefined) {
            save = parent;
            parent = parent.$parent();
          }

          if (typeof save?.state === "number") {
            formState = save?.state;
          }

          return arr.length > 0 || (arr.length === 0 && formState === 0);
        },
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
    },
  },
  { _id: false }
);

// doc.invalidate(
//       "course_start", // this is the path of the error
//       "Se debe seleccionar al menos una fecha ideal de implementación.", .. this is the error msg
//       [] // return empty array // this is the value associated to the error
//     );
//
//  lets say we are in the parent of all documents, and a field called name fails validation
//  then the path of the error would be just name
//  if a field (data) has a document and for example one error in the subdocument has path notes.i.content
//  i being the index in notes that failed
//  in the final error we would see name.notes.i.content
//  the path of the children is added to the fathers

// in each validation we have state
// if state == 0 we are saving temporarely
// if state == 1 we are registering the course
// when state == 0
// if a string field length is 0, it is valid, if not empty string then it must be valid
// number, must fall on the constrinns always
// array, similarly to a string, if is empty, it can pass as valid, if not empty, must be checked
// the idea is to only store valid field values on the database and set the state to 0

// TODO: update front step form validate functions to also know if the step is valid when state = 0
// we could add a error handling base on the path of the errors, and then update the store accordingly,
// or we could just spam toast on each path error + a little path processing to make it look legible
// Add a id (number || null) to the form store, so that we can set a stored form and set the global
// form to it, the id is to then know on the controller that we have to update an existing form if the state is 0 and id not null
// (if not null we must check the id is valid, and belongs to the teacher)
// if no id then we just try to save with state = 0

// idea, when temporarely saving a form on the db, the local form is resetted
// we could update the my_courses view to show registered and incomplete courses (based on state)
// we add a button to continue a form (courses where state == 0), that the only thing it does is move the course_data as the register form data
// teacher field must be deleted, and then we navigate to register course view, we may also need to set currentstep to 1

CourseDataSchema.pre("validate", async function (next) {
  // this will run before mongoose validates the document,
  // if this is part of a field, then it will run even before type validation
  // thats what i understood anyway

  const doc = this;
  let formState = 1;

  let save: any = doc;
  let parent = doc.$parent();

  if (parent !== undefined) {
    save = parent;
    parent = parent.$parent();
  }

  if (typeof save?.state === "number") {
    formState = save?.state;
  }

  if (
    !Array.isArray(doc.course_start) ||
    (doc.course_start.length === 0 && formState !== 0)
  ) {
    doc.invalidate(
      "course_start",
      "Se debe seleccionar al menos una fecha ideal de implementación.",
      [] // return empty array
    );
    return next();
  }

  // Fetch all valid date entries from the other collection:
  const allDates = await courseDatesModel.find().lean();

  const validDateStrings = new Set(
    allDates.map((d) =>
      JSON.stringify({
        start_date: d.start_date,
        end_date: d.end_date,
        start_month: d.start_month,
        end_month: d.end_month,
      })
    )
  );

  doc.course_start.forEach((cs, idx) => {
    const csString = JSON.stringify({
      start_date: cs.start_date,
      end_date: cs.end_date,
      start_month: cs.start_month,
      end_month: cs.end_month,
    });

    if (!validDateStrings.has(csString)) {
      doc.invalidate(
        `course_start.${idx}`, // the whole date failed
        `La fecha ${csString} no es una opción válida`,
        cs // return the course_Start
      );
    }
  });

  next();
});

const programContentSchema = new mongoose.Schema(
  {
    course_purpose: {
      type: String,
    },
    learning_objectives: [String],
  },
  { _id: false }
);

programContentSchema.pre("validate", function (next) {
  //a subdocument

  const doc = this;
  let formState = 1;

  let save: any = doc;
  let parent = doc.$parent();

  if (parent !== undefined) {
    save = parent;
    parent = parent.$parent();
  }

  if (typeof save?.state === "number") {
    formState = save?.state;
  }

  if (
    typeof doc.course_purpose === "string" &&
    !(formState === 0 && doc.course_purpose.length === 0) && // check
    (doc.course_purpose.length > 500 || doc.course_purpose.length < 250)
  ) {
    doc.invalidate(
      `course_purpose`,
      "El largo del próposito del curso es entre 250 y 500 carácteres",
      doc.course_purpose
    );
  }

  if (Array.isArray(doc.learning_objectives)) {
    if (doc.learning_objectives.length === 0) {
      if (formState !== 0) {
        // check
        doc.invalidate(
          `learning_objectives`,
          "Debe haber al menos un objetivo",
          []
        );
      }
    } else {
      doc.learning_objectives.forEach((lo, index) => {
        if (typeof lo !== "string") {
          doc.invalidate(`learning_objectives.${index}`, "Debe ser texto", ""); // we reset the value to an empty string
        } else if (typeof lo === "string") {
          if (lo.length < 100 || lo.length > 250) {
            doc.invalidate(
              `learning_objectives.${index}`,
              "El largo debe ser entre 100 y 250 carácteres",
              lo
            );
          }
        }
      });
    }
  }

  next();
});

const MaterialsSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    link: String,
  },
  { _id: false }
);

const StaffSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    rut: String,
    email: String,
    phone: String,
    position: String,
  },
  { _id: false }
);

const DailyPlanificationSchema = new mongoose.Schema(
  {
    day: Number,
    first_period: String,
    first_classroom: String,
    second_period: String,
    second_classroom: String,
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema({
  // the validation will only check the required if the type dont match then there is castError
  // we could move all the required checking to the .pre of each subSchema

  course_data: {
    type: CourseDataSchema,
    required: true,
  },
  program_content: {
    type: programContentSchema,
    required: true,
  },
  weekly_planification: {
    type: [DailyPlanificationSchema],
    required: true,
  },
  teacher: {
    // No need to check for this as the endpoint will use an existing teacher on the database
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    rut: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    degree: { type: String, required: true },
    college_relationship: { type: String, required: true },
  },
  staff: {
    type: [StaffSchema],
    required: true,
  },
  materials: {
    type: [MaterialsSchema],
    required: true,
  },
  state: {
    // 1 indicates we want strict_checking
    // 0 means we are saving it for later
    // when 0
    // all numbers must check their constraints
    // for strings, if the string is not empty, check constraints
    // for arrays, if array is not empty, check constraings
    type: Number,
    required: true,
  },
});

courseSchema.pre("validate", function (next) {
  const doc = this;

  const formState = doc.state; // extract the state, we are on parent

  // VALIDATE MATERIALS
  this.materials.forEach((m, i) => {
    if (typeof m.quantity !== "number" || m.quantity <= 0) {
      // number, we check normally
      doc.invalidate(
        `materials.${i}.quantity`, // the i element of materials has a failed quantity, if we can parse this path on front then we
        // can change the value of what that element has at that position
        "La cantidad mínima de materiales es 1",
        m.quantity
      );
    }

    if (
      typeof m.name === "string" &&
      !(formState === 0 && m.name.length === 0) && // check state
      (m.name.length < 5 || m.name.length > 50)
    ) {
      doc.invalidate(
        `materials.${i}.name`,
        "El largo del nombre del material debe ser entre 5 y 50 carácteres",
        m.name
      );
    }

    if (
      typeof m.link === "string" &&
      !(formState === 0 && m.link.length === 0) && // check state
      !urlValidation(m.link)
    ) {
      doc.invalidate(
        `materials.${i}.link`,
        "El link del material no es una URL válida",
        m.link
      );
    }
  });

  // VALIDATE STAFF

  this.staff.forEach((s, index) => {
    if (
      typeof s.first_name === "string" &&
      !(formState === 0 && s.first_name.length === 0) && // checking state
      (s.first_name.length === 0 || s.first_name.length > 50)
    ) {
      doc.invalidate(
        `staff.${index}.first_name`,
        "El nombre debe tener entre 1 y 50 caracteres",
        s.first_name
      );
    }

    if (
      typeof s.last_name === "string" &&
      !(s.last_name.length === 0 && formState === 0) && // check
      (s.last_name.length === 0 || s.last_name.length > 50)
    ) {
      doc.invalidate(
        `staff.${index}.last_name`,
        "Los apellidos deben tener entre 1 y 50 caracteres",
        s.last_name
      );
    }

    const { isValid, msg } =
      typeof s.rut === "string"
        ? validateRut(s.rut)
        : { isValid: false, msg: "El rut no cumple con el formato" };

    if (
      typeof s.rut === "string" &&
      !(s.rut.length === 0 && formState === 0) && // check
      !isValid
    ) {
      doc.invalidate(`staff.${index}.rut`, msg, s.rut);
    }

    if (
      typeof s.email === "string" &&
      !(s.email.length === 0 && formState === 0) && // check
      !validateEmail(s.email)
    ) {
      doc.invalidate(`staff.${index}.email`, "Email inválido", s.email);
    }

    if (
      typeof s.phone === "string" &&
      !(s.phone.length === 0 && formState === 0) && // check
      !validatePhone(s.phone)
    ) {
      doc.invalidate(
        `staff.${index}.phone`,
        "El teléfono es inválido",
        s.phone
      );
    }
  });

  // validate daily_planification

  const periodMax = 250;
  const periodMin = 100;
  const classroomMax = 30;
  const classroomMin = 3;

  doc.weekly_planification.forEach((day, i) => {
    if (
      typeof day.first_period === "string" &&
      !(day.first_period.length === 0 && formState === 0) // check
    ) {
      if (day.first_period.length > periodMax) {
        doc.invalidate(
          `weekly_planification.${i}.first_period`,
          `La descripción no puede superar los ${periodMax} caracteres de largo.`,
          day.first_period
        );
      } else if (day.first_period.length < periodMin) {
        doc.invalidate(
          `weekly_planification.${i}.first_period`,
          `La descripción tiene que ser de al menos ${periodMin} caracteres de largo.`,
          day.first_period
        );
      }
    }

    if (
      typeof day.first_classroom === "string" &&
      !(day.first_classroom.length === 0 && formState === 0) //check
    ) {
      if (day.first_classroom.length > classroomMax) {
        doc.invalidate(
          `weekly_planification.${i}.first_classroom`,
          `El nombre de sala no puede superar los ${classroomMax} caracteres.`,
          day.first_classroom
        );
      } else if (day.first_classroom.length < classroomMin) {
        doc.invalidate(
          `weekly_planification.${i}.first_classroom`,
          `El nombre de sala debe tener al menos ${classroomMin} caracteres.`,
          day.first_classroom
        );
      }
    }

    if (
      typeof day.second_period === "string" &&
      !(day.second_period.length === 0 && formState === 0) // check
    ) {
      if (day.second_period.length > periodMax) {
        doc.invalidate(
          `weekly_planification.${i}.second_period`,
          `La descripción no puede superar los ${periodMax} caracteres de largo.`,
          day.second_period
        );
      } else if (day.second_period.length < periodMin) {
        doc.invalidate(
          `weekly_planification.${i}.second_period`,
          `La descripción tiene que ser de al menos ${periodMin} caracteres de largo.`,
          day.second_period
        );
      }
    }

    if (
      typeof day.second_classroom === "string" &&
      !(day.second_classroom.length === 0 && formState === 0) // check
    ) {
      if (day.second_classroom.length > classroomMax) {
        doc.invalidate(
          `weekly_planification.${i}.second_classroom`,
          `El nombre de sala no puede superar los ${classroomMax} caracteres.`,
          day.second_classroom
        );
      } else if (day.second_classroom.length < classroomMin) {
        doc.invalidate(
          `weekly_planification.${i}.second_classroom`,
          `El nombre de sala debe tener al menos ${classroomMin} caracteres.`,
          day.second_classroom
        );
      }
    }
  });

  next();
});

const CoursesModel = mongoose.model("cursosEDV_courses", courseSchema);

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
