import { Route, Routes, Link } from "react-router";
import MultiStepForm from "./components/register-course/Multistep";
import ViewCourses from "./components/view-courses/ViewCourses";
import NewTeacherRegister from "./components/teacher-register/NewTeacherRegister";
import TeacherLogin from "./components/teacher-login/TeacherLogin";

function RegisterForm() {
  return (
    <>
      <div className="course-register">
        <div className="register-header">
          <h1>Formulario Inscripción EdV Verano 2026</h1>
          <h4>
            Este formulario pretende optimizar y sistematizar los programas e
            información asociadas a los cursos EdV.
          </h4>
          <h4 className="register-precaution">
            Recuerda que todos los campos marcados con
            <span className="required"></span> son obligatorios.
          </h4>
        </div>
        <div className="course-form-container">
          <Link to="/course-form">Registrar Curso</Link>

          <Link to="/view-courses"> Ver Cursos</Link>
          <Link to="/register-teacher">Registro profesores</Link>
          <Link to="/login-teacher">Acceso profesores</Link>
        </div>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
      <RegisterForm />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="course-form" element={<MultiStepForm />}></Route>
        <Route path="view-courses" element={<ViewCourses />}></Route>
        <Route path="register-teacher" element={<NewTeacherRegister />}></Route>
        <Route path="login-teacher" element={<TeacherLogin />}></Route>
      </Routes>
    </>
  );
}

export default App;
