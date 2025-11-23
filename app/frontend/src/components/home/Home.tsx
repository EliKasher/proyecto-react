import { useSelector } from "react-redux";
import { type AppState } from "../../store.ts";
import type { IUser } from "../../types/users.ts";
import TeacherLogin from "../teacher-login/TeacherLogin.tsx";
import { Link } from "react-router-dom";
import FunctionaryHome from "../functionary-home/FunctionaryHome.tsx";

const RegisterForm = () => {
    return (
        <div className="course-register p-6">
            <div className="register-header mb-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Formulario Inscripción EdV Verano 2026</h1>
                <h4 className="text-lg mb-4">
                    Este formulario pretende optimizar y sistematizar los programas e
                    información asociadas a los cursos EdV.
                </h4>
                <h4 className="register-precaution text-lg mb-8">
                    Recuerda que todos los campos marcados con
                    <span className="required"></span> son obligatorios.
                </h4>
            </div>
            <div className="course-form-container flex gap-6 justify-center">
                <Link
                    to="/course-form"
                    className="px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                    Registrar Curso
                </Link>
                <Link
                    to="/view-courses"
                    className="px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                    Ver Cursos
                </Link>
            </div>
        </div>
    );
};

const Home = ({ }) => {
    const user: IUser = useSelector((state: AppState) => {
        return state.user
    })

    if (!user.logged) {
        return (
            <div className="login-container">
                <TeacherLogin />
                <p className="main-footer">
                    ¿Eres funcionario? <Link to="/login-functionary">Ingresa aquí</Link>
                </p>
            </div>
        );
    }
    if (user.roles === "functionary") {
        return <FunctionaryHome />;
    }

    return <RegisterForm />;

}

export default Home;