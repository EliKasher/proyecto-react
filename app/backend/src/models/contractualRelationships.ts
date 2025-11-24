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
  requirements: Array<String>,
});

const ContractualRelationshipsModel = mongoose.model(
  "cursosEDV_contractual_relationships",
  contractualRelationshipSchema
);

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

const initialContractualRelations = [
  { relation: "Personal de Planta", requirements: ["cv", "id_cl"] },
  { relation: "Personal a Contrata", requirements: ["cv", "id_cl"] },
  {
    relation: "Convenio a Honorario",
    requirements: ["cv", "id_cl", "titulo_prof"],
  },
  {
    relation: "Estudiante de Posgrado",
    requirements: ["cv", "id_cl", "titulo_prof"],
  },
  {
    relation: "Estudiante de Pregrado",
    requirements: ["matricula_pre", "form_cc", "foces"],
  },
  { relation: "Sin Vinculo laboral con la UCH", requirements: ["cv", "id_cl"] },
];

async function initializeContractualRelations() {
  try {
    for (const rel of initialContractualRelations) {
      const exists = await ContractualRelationshipsModel.findOne({
        relation: rel.relation,
      });
      if (!exists) {
        await ContractualRelationshipsModel.create(rel);
        console.log(`Inserted contractual relation: ${rel.relation}`);
      } else {
        console.log(`Contractual relation already exists: ${rel.relation}`);
      }
    }
  } catch (error: any) {
    console.error("Error initializing contractual relations:", error.message);
  }
}

initializeContractualRelations();

export default ContractualRelationshipsModel;
