import config from "../utils/config";
import validators from "../utils/validators";

import mongoose from "mongoose";

const uri = config.MONGODB_URI;

if (uri) {
  mongoose.connect(uri).catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });
}

const teachersSchema = new mongoose.Schema({
  first_name: { type: String, required: true, minLength: 3 },
  last_name: { type: String, required: true, minLength: 3 },
  password: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: validators.passwordValidator.validator,
      message: validators.passwordValidator.errorMessage,
    },
  },
  rut: {
    type: String,
    required: [true, "Rut is needed"],
    unique: [true, "The rut already exists."],
    validate: [
      {
        validator: function (rut: string) {
          return /^\d{7,8}-(\d|k)$/i.test(rut);
        },
        message:
          'RUT format is invalid. It should be 7 or 8 digits followed by - and a digit or "k".',
      },
      {
        validator: function (rut: string) {
          const [digits, lastDigit] = rut.toLowerCase().split("-");
          if (!digits || !lastDigit) return false;

          const reverseDigits = digits.split("").reverse();

          const digitsMultiplied = reverseDigits.map(
            (digit, index) => Number(digit) * (2 + (index % 6))
          );

          const sum = digitsMultiplied.reduce((acc, val) => acc + val, 0);
          const mod = sum % 11;
          const check = 11 - mod;

          const expected =
            check === 11 ? "0" : check === 10 ? "k" : String(check);

          return lastDigit === expected;
        },
        message: "RUT verification digit is invalid.",
      },
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      //regex de https://gist.github.com/jaimeguaman/5819511
      validator: (v: string) =>
        /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/.test(v),
    },
  },
  degree: { type: String, required: true },
  college_relationship: { type: String, required: true },
  roles: {
    type: String,
    enum: ["teacher", "admin", "functionary"],
    default: "teacher",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cursosEDV_courses",
    },
  ],
});

const TeachersModel = mongoose.model("cursosEDV_teacher", teachersSchema);

teachersSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
      password?: string;
    }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default TeachersModel;
