import './frontend/styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Materials from './frontend/components/MaterialForm';

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
    <></>
  )
}

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="register-course" element={<InscriptionForm />}></Route>
        <Route path="/materials" element={<Materials />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App;
