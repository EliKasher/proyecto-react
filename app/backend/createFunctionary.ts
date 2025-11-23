import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import FunctionaryModel from "./src/models/functionary";

// Cargar variables de entorno desde .env
dotenv.config();

async function createFunctionary() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not found in .env");

    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");

    const password = "ValidPass123"; // Debe cumplir las validaciones
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFunctionary = new FunctionaryModel({
      first_name: "Tomás",
      last_name: "Mendez",
      email: "tomas.mendez@edv.cl",
      rut: "12345678-5",
      password: hashedPassword,
      roles: "functionary"
    });

    const saved = await newFunctionary.save();
    console.log("Funcionario creado:", saved.toJSON());

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createFunctionary();
