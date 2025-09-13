import "./frontend/styles/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CourseForm from "./frontend/components/Courses"
import TeacherForm from "./frontend/components/RegisterTeacher"

function InscriptionForm() {
    return (
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
                    <CourseForm />
                </form>
            </div>
        </div>
    )
}
function Teacher() {
    return (
        <div className="teacher-register">
            <div className="register-header">
                <h2>Formulario Inscripción Docente EdV Verano 2026</h2>
                <h4>Esta información será registrada para poder acceder a sus cursos y además poder cargar su documentación de pago según su relación contractual.</h4>
                <h4 className="register-precaution">
                    Recuerda que todos los campos marcados con
                    <span className="required"></span> son obligatorios.
                </h4>
            </div>
            <div className="teacher-form-container">
                <form className="teacher-form">
                    <TeacherForm />
                </form>
            </div>
        </div>
    )
}
function Home() {
    return null
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="register-course" element={<InscriptionForm />} />
                <Route path="register-teacher" element={<Teacher />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
