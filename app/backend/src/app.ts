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
import testingRouter from "./controllers/testing"
import path from "path";

const app = express();

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
