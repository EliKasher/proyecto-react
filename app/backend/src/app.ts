import express from "express";
import coursesDatesRouter from "./controllers/courseDates";
import educationalLevelsRouter from "./controllers/educationalLevels";
import facultiesRouter from "./controllers/faculties";
import teachersRouter from "./controllers/teachers";
import coursesRouter from "./controllers/courses";
import contractualRelationshipsRouter from "./controllers/contractualRelationships";
import documentsRouter from "./controllers/documents";

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use("/api/teachers", teachersRouter);
app.use("/api/course-dates", coursesDatesRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/educational-levels", educationalLevelsRouter);
app.use("/api/faculties", facultiesRouter);
app.use("/api/contractual-relations", contractualRelationshipsRouter)
app.use("/api/documents", documentsRouter);

export default app;