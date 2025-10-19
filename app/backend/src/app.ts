import express from "express";
import coursesDatesRouter from "./controllers/courseDates";
import educationalLevelsRouter from "./controllers/educationalLevels";
import facultiesRouter from "./controllers/faculties";
import teachersRouter from "./controllers/teacher";
import coursesRouter from "./controllers/courses";
import contractualRelationshipsRouter from "./controllers/contractualRelationships";
import documentsRouter from "./controllers/documents";
import teacherLoginRouter from "./controllers/teacherLogin";
import middleware from "./utils/middleware";
import functionaryLoginRouter from "./controllers/functionaryLogin";
import functionaryRouter from "./controllers/functionary";
import logoutRouter from "./controllers/logout";

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use("/api/teachers", teachersRouter);
app.use("api/functionaries", functionaryRouter);
app.use("/api/course-dates", coursesDatesRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/educational-levels", educationalLevelsRouter);
app.use("/api/faculties", facultiesRouter);
app.use("/api/contractual-relations", contractualRelationshipsRouter)
app.use("/api/documents", documentsRouter);
app.use("/api/teacher-login", teacherLoginRouter);
app.use("/api/functionary-login", functionaryLoginRouter);
app.use("/api/logout", logoutRouter);
app.use(middleware.errorHandler);
export default app;