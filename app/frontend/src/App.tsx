import { Route, Routes, Link } from 'react-router';
import CourseForm from './components/Courses';
import WeeklyProgramForm from './components/WeeklyProgram';
import RegisterTeacher from "./components/RegisterTeacher";
import Materials from './components/MaterialForm';
import MultiStepForm from './components/Multistep';

import "./styles/App.css"

function InscriptionForm() {
  return (
    <>
      <div className="course-register">
        <div className="register-header">
          <h1>Formulario Inscripción EdV Verano 2026</h1>
          <h4>Este formulario pretende optimizar y sistematizar los programas e información asociadas a los cursos EdV.</h4>
          <h4 className="register-precaution">
            Recuerda que todos los campos marcados con
            <span className="required"> *</span> son obligatorios.
            </h4>
        </div>
        <div className="course-form-container">
          <Link to="/course-form">Registrar Curso</Link>
          <form className="course-form">

          </form>
        </div>
      </div>
    </>
  )
}

function Home() {
  return (
    <>
      <InscriptionForm />
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="course-form" element={<MultiStepForm />}></Route>
        <Route path="course" element={<CourseForm />}></Route>
        <Route path="register-course" element={<InscriptionForm />}></Route>
        <Route path="weekly-program" element={<WeeklyProgramForm />}></Route>
        <Route path="register-teacher" element={<RegisterTeacher />}></Route>
        <Route path="materials" element={<Materials />}></Route>
      </Routes>
    </>
  )
}

export default App;
