import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import MultiStepForm from "./components/register-course/Multistep";
import ViewCourses from "./components/view-courses/ViewCourses";
import NewTeacherRegister from "./components/teacher-register/NewTeacherRegister";
import TeacherLogin from "./components/teacher-login/TeacherLogin";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

export type Teacher = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

function RegisterForm() {
  return (
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
      </div>
    </div>
  );
}

function Home({ user, setUser }: { user: Teacher | null; setUser: (u: Teacher) => void }) {
  if (!user) {
    return (
      <div className="login-container">
        <TeacherLogin onLogin={setUser} />
        <p>
          ¿No tienes cuenta? <Link to="/register-teacher">Regístrate aquí</Link>
        </p>
      </div>
    );
  }

  return <RegisterForm />;
}

function App() {
  const [user, setUser] = useState<Teacher | null>(null);
    
  const userRole = localStorage ? localStorage.getItem('userRole') : "teacher";
  const userName = localStorage ? localStorage.getItem('name') : "Eve";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('name');
    window.location.href = '/';
  };
  
  return (
    <>
      <Router>
        <Header 
          userRole={userRole}
          userName={userName}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="course-form"
            element={user ? <MultiStepForm /> : <Navigate to="/" />}
          />
          <Route
            path="view-courses"
            element={user ? <ViewCourses /> : <Navigate to="/" />}
          />
          <Route
            path="register-teacher"
            element={!user ? <NewTeacherRegister /> : <Navigate to="/" />}
          />
          <Route
            path="login-teacher"
            element={!user ? <TeacherLogin onLogin={setUser} /> : <Navigate to="/" />}
          />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
      
    </>
  );
}


export default App;
