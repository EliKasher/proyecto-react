import { Route, Routes, Link } from 'react-router';
import WeeklyProgramForm from './components/WeeklyProgram';
import RegisterTeacher from "./components/RegisterTeacher";
import Materials from './components/MaterialForm';
import MultiStepForm from './components/Multistep';
import "./styles/App.css"
import CourseForm from './components/Courses';
import ProgramContentForm from './components/ProgramContent';
import MaterialForm from './components/MaterialForm';
import StaffForm from './components/Staff';

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
      </Routes>
    </>
  )
}

export default App;
