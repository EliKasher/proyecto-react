import * as React from "react";
import courseService from "../services/Course";
import { type CourseDate } from "../types/course";

type DataCurso = {
    name: "";
    faculty: "";
    educational_level: string[];
    quota: number;
    course_start: CourseDate[];
};

type ContenidoPrograma = {
    course_purpose: string;
    learning_objectives: string[];
};


type Curso = {
    id: string | number;
    course_data: DataCurso;
    program_content: ContenidoPrograma;
};

const ViewCourses: React.FC = () => {
    const [cursos, setCursos] = React.useState<Curso[]>([]);

    React.useEffect(() => {
        courseService.getCourses().then((data) => {console.log(data); setCursos(data)});
    }, []);

    const [cursoSeleccionado, setCursoSeleccionado] =
        React.useState<Curso | null>(null);

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
            <h2>Lista de Cursos</h2>
            {cursos.length === 0 ? (
                <p>No hay cursos.</p>
            ) : (
                <ul>
                    {cursos.map((curso) => (
                        <li key={curso.id} style={{ margin: "0.5rem 0" }}>
                            <button onClick={() => setCursoSeleccionado(curso)}>
                                {curso.course_data.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {cursoSeleccionado && (
                <div
                    style={{
                        marginTop: "2rem",
                        border: "1px solid #ccc",
                        padding: "1rem",
                        borderRadius: 8,
                    }}
                >
                    <h3>{cursoSeleccionado.course_data.name}</h3>
                    <p>
                        <b>Facultad:</b> {cursoSeleccionado.course_data.faculty}
                    </p>
                    <p>
                        <b>Niveles:</b>{" "}
                        {cursoSeleccionado.course_data.educational_level.join(", ")}
                    </p>
                    <p>
                        <b>Cupo total:</b> {cursoSeleccionado.course_data.quota}
                    </p>

                    {cursoSeleccionado.course_data.course_start.length > 0 ? (
                        <p>
                            <b>Fecha:</b>{" "}
                            {"Del " +
                                cursoSeleccionado.course_data.course_start[0].start_date +
                                " de " +
                                cursoSeleccionado.course_data.course_start[0].start_month +
                                " al " +
                                cursoSeleccionado.course_data.course_start[0].end_date +
                                " del " +
                                cursoSeleccionado.course_data.course_start[0].end_month}
                        </p>
                    ) : (
                        <></>
                    )}

                    <p>
                        <b>Descripción:</b>{" "}
                        {cursoSeleccionado.program_content.course_purpose}
                    </p>
                </div>
            )}
            <button onClick={() => console.log(cursos)}> debug</button>
        </div>
    );
};

export default ViewCourses;
