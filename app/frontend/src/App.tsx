import { HashRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  roles: string[];
};

export type Functionary = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
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
        <p className="main-footer">
          ¿Eres funcionario? <Link to="/functionary-login">Ingresa aquí</Link>
        </p>
      </div>
    );
  }

  return <RegisterForm />;
}

function App() {
  const [user, setUser] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true); // ← Estado de carga

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
                
        if (savedUser && token) {
          const userData = JSON.parse(savedUser);
          console.log('Usuario encontrado:', userData);
          setUser(userData);
        } else {
          console.log('No hay usuario en localStorage');
          setUser(null);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    fetch('/api/logout', { method: 'POST' });
  };

  // Determinar el rol principal para el header
  const getPrimaryRole = () => {
    if (!user) return null;
    
    if (user.roles && user.roles.length > 0) {
      if (user.roles.includes('admin')) return 'admin';
      if (user.roles.includes('functionary')) return 'functionary';
      if (user.roles.includes('teacher')) return 'teacher';
      return user.roles[0];
    }
    
    return 'teacher';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Header 
          userRole={getPrimaryRole()}
          userName={user?.first_name || null}
          onLogout={logout}
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