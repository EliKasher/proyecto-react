import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import MultiStepForm from './components/Multistep';
import ViewCourses from "./components/ViewCourses";
import Header from "./components/Header";

function RegisterForm() {
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
          <Link to="/course-form">Registrar Curso</Link>

            <Link to="/view-courses"> Ver Cursos</Link>
        </div>

      </div>
    </>
  )
}


function Home() {
  return (
    <>
      <RegisterForm />
    </>
  )
}

function App() {
  const userRole = localStorage ? localStorage.getItem('userRole') : "teacher";
  const userName = localStorage ? localStorage.getItem('name') : "Eve";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  // View courses filtrar por userRole

  return (
    <>
      <Router>
        <Header 
          userRole={userRole}
          userName={userName}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="course-form" element={<MultiStepForm />}></Route>
          <Route path="view-courses" element={<ViewCourses />}></Route>
          <Route path="functionary-profile"></Route>
          <Route path="teacher-profile"></Route>
          <Route path="functionary-form"></Route>
          <Route path="register"></Route>
          <Route path="login"></Route>
          <Route path="logout"></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
