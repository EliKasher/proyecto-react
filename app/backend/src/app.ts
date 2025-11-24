import express from "express";
import coursesDatesRouter from "./controllers/courseDates";
import educationalLevelsRouter from "./controllers/educationalLevels";
import facultiesRouter from "./controllers/faculties";
import teachersRouter from "./controllers/teacher";
import coursesRouter from "./controllers/courses";
import contractualRelationshipsRouter from "./controllers/contractualRelationships";
import documentsRouter from "./controllers/documents";
import middleware from "./utils/middleware";
import functionaryRouter from "./controllers/functionary";
import logoutRouter from "./controllers/logout";
import loginRouter from "./controllers/login";
import testingRouter from "./controllers/testing";
import path from "path";
import mongoose from "mongoose";
import config from "./utils/config";

const app = express();

const dbUri = config.MONGODB_URI;
const dbName = config.MONGODB_NAME;

if (!dbUri) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

// Connect with mongoose.connect(uri, options)
mongoose
  .connect(dbUri, {
    // if you want to override the DB name from the URI
    dbName: dbName,

    // optional: tune timeout
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Optional: listen for errors after connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connection opened");
});

app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/teachers", teachersRouter);
app.use("/api/functionaries", functionaryRouter);
app.use("/api/course-dates", coursesDatesRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/educational-levels", educationalLevelsRouter);
app.use("/api/faculties", facultiesRouter);
app.use("/api/contractual-relations", contractualRelationshipsRouter);
app.use("/api/documents", documentsRouter);
//solo exponer api/testing en ambiente de test
if (process.env.NODE_ENV == "test") {
  app.use("/api/testing", testingRouter);
}
app.use(express.static("dist"));

app.use(middleware.errorHandler);
export default app;
