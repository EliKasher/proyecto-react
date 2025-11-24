import config from "../utils/config";

import mongoose, { Mongoose } from "mongoose";

const uri = config.MONGODB_URI;

// if (uri) {
//   mongoose.connect(uri).catch((error) => {
//     console.log("error connecting to MongoDB", error.message);
//   });
// }

const courseDateSchema = new mongoose.Schema({
  start_date: String,
  start_month: String,
  end_date: String,
  end_month: String,
});

const courseDatesModel = mongoose.model(
  "cursosEdV_course_dates",
  courseDateSchema
);

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

const initialCourseDates = [
  { start_date: "5", end_date: "9", start_month: "enero", end_month: "enero" },
  {
    start_date: "12",
    end_date: "16",
    start_month: "enero",
    end_month: "enero",
  },
  {
    start_date: "19",
    end_date: "23",
    start_month: "enero",
    end_month: "enero",
  },
];

async function initializeCourseDates() {
  try {
    await courseDatesModel.deleteMany({});
    for (const date of initialCourseDates) {
      await courseDatesModel.create(date);
    }
  } catch (error: any) {
    console.error("Error initializing course dates:", error.message);
  }
}

initializeCourseDates();

export default courseDatesModel;
