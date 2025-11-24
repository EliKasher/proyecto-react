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

// const initialCourseDates = [
//   { start_date: 5, end_date: 9, start_month: "enero", end_month: "enero" },
//   { start_date: 12, end_date: 16, start_month: "enero", end_month: "enero" },
//   { start_date: 19, end_date: 23, start_month: "enero", end_month: "enero" },
// ];

// async function initializeCourseDates() {
//   try {
//     for (const date of initialCourseDates) {
//       const exists = await courseDatesModel.findOne({
//         start_date: date.start_date,
//         end_date: date.end_date,
//         start_month: date.start_month,
//         end_month: date.end_month,
//       });

//       if (!exists) {
//         await courseDatesModel.create(date);
//         console.log(
//           `Inserted course date: ${date.start_date}-${date.end_date} ${date.start_month}`
//         );
//       } else {
//         console.log(
//           `Course date already exists: ${date.start_date}-${date.end_date} ${date.start_month}`
//         );
//       }
//     }
//   } catch (error: any) {
//     console.error("Error initializing course dates:", error.message);
//   }
// }

// initializeCourseDates();

export default courseDatesModel;
