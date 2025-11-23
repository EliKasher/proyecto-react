import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import Profile from "./components/profile/Profile";

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
  const navigate = useNavigate();

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
      navigate("/")


    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0f0c29] to-[#47308b] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b83284] mx-auto"></div>
            <p className="mt-4 text-[#f0f0f5]">Cargando...</p>
          </div>
        </div>
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
        <Route
          path="profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
