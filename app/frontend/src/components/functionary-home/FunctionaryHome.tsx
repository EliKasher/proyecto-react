import { useSelector } from "react-redux";
import { type AppState } from "../../store.ts";
import type { IUser } from "../../types/users.ts";
import TeacherLogin from "../teacher-login/TeacherLogin.tsx";
import { Link } from "react-router-dom";
import ExportExcel from "../export-excel/ExportExcel";

const FunctionaryOptions = () => {
    return (
        <div className="course-register p-6">
            <div className="register-header mb-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Panel de Funcionario</h1>
                <h4 className="text-lg mb-4">
                    Accede a las herramientas disponibles para funcionarios de EdV.
                </h4>
            </div>
            <div className="course-form-container flex flex-col gap-6 items-center">
                <Link
                    to="/view-courses"
                    className="px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                    Ver Cursos
                </Link>
                <ExportExcel />
            </div>
        </div>
    );
};

const FunctionaryHome = () => {
    const user: IUser = useSelector((state: AppState) => {
        return state.user;
    });

    if (!user.logged) {
        return (
            <div className="login-container">
                <TeacherLogin />
                <p className="main-footer">
                    ¿Eres docente? <Link to="/login-teacher">Ingresa aquí</Link>
                </p>
            </div>
        );
    }

    return <FunctionaryOptions />;
};

export default FunctionaryHome;
