import { Route, Routes, Link } from 'react-router';
import CourseForm from './components/Courses';
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
            <span className="required"></span> son obligatorios.
            </h4>
        </div>
        <div className="course-form-container">
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
      <CourseForm />
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="register-course" element={<InscriptionForm />}></Route>
      </Routes>
    </>
  )
}

export default App;
