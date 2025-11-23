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
    required: false,
  },
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

const initialDocuments = [
  { short_name: "cv", full_name: "Curriculum Vitae Actualizado" },
  { short_name: "id_cl", full_name: "Cédula de identidad al día" },
  { short_name: "titulo_prof", full_name: "Título profesional" },
  {
    short_name: "matricula_pre",
    full_name: "Certificado de alumno regular",
    note: "Matrícula vigente en algún plan de estudio de Pregrado de la Universidad de Chile, acreditado con certificado de Alumno Regular con vigencia en el semestre actual (descargable desde Ucampus).",
  },
  {
    short_name: "form_cc",
    full_name: "Formulario de cuenta corriente",
    note: "Ingresa a https://form-dirbde.uchile.cl/cuenta-corriente una vez ingresados los datos, enviar el respaldo (puede ser un print de pantalla).",
  },
  {
    short_name: "foces",
    full_name: "Formulario FOCES",
    note: "Ingresa a https://foces.uchile.cl/auth/login Una vez completado, descargar el certificado y envíalo.",
  },
];

async function initializeDocuments() {
  try {
    for (const doc of initialDocuments) {
      const exists = await DocumentsModel.findOne({
        short_name: doc.short_name,
      });
      if (!exists) {
        await DocumentsModel.create(doc);
        console.log(`Inserted document: ${doc.short_name}`);
      } else {
        console.log(`Document already exists: ${doc.short_name}`);
      }
    }
  } catch (error: any) {
    console.error("Error initializing documents:", error.message);
  }
}

initializeDocuments();

export default DocumentsModel;
