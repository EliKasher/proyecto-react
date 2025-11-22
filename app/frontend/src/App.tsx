import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MultiStepForm from "./components/register-course/Multistep";
import ViewCourses from "./components/view-courses/ViewCourses";
import NewTeacherRegister from "./components/teacher-register/NewTeacherRegister";
import TeacherLogin from "./components/teacher-login/TeacherLogin";
import FunctionaryLogin from "./components/functionary-login/FunctionaryLogin.tsx";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import LoginService from "./services/Login";
import Home from "./components/home/Home.tsx";

import { useDispatch, useSelector } from "react-redux";
import { resetUser, setUser } from "./reducers/userReducer.ts";
import { type AppState } from "./store.ts";

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

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const init = async () => {
          const user = await LoginService.restoreLogin();

          if (user) {
            dispatch(setUser({ ...user, logged: true }));
          }

          setLoading(false);
        };
        init();
      } catch (error) {
        console.error("Error cargando usuario:", error);
        localStorage.removeItem("token");
      }
    };

    loadUserFromStorage();
  }, []);

  const logout = async () => {
    try {
      LoginService.logout();
    } catch (error) {
      console.error("Error en logout del backend:", error);
    } finally {
      dispatch(resetUser());
      localStorage.removeItem("token");
    }
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
      <Header
        userRole={user.roles}
        userName={user?.first_name || null}
        onLogout={logout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="course-form"
          element={user.logged ? <MultiStepForm /> : <Navigate to="/" />}
        />
        <Route
          path="view-courses"
          element={user.logged ? <ViewCourses /> : <Navigate to="/" />}
        />
        <Route
          path="register-teacher"
          element={!user.logged ? <NewTeacherRegister /> : <Navigate to="/" />}
        />
        <Route
          path="login-teacher"
          element={!user.logged ? <TeacherLogin /> : <Navigate to="/" />}
        />
        <Route
          path="functionary-login"
          element={!user.logged ? <FunctionaryLogin /> : <Navigate to="/" />}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
