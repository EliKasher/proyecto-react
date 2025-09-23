import * as React from "react"
import data from "../../../backend/data/db.json"
type Curso = {
    id: number
    nombre_curso: string
    facultad: string
    niveles: string[]
    cupo_total: number
    fecha_implementacion: string
    descripcion: string
    objetivos: string[]
    contenidos: [string, string][]
}


const ViewCourses: React.FC = () => {
    const cursos = (data as { cursos: Curso[] }).cursos

    const [cursoSeleccionado, setCursoSeleccionado] = React.useState<Curso | null>(null)

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
            <h2>Lista de Cursos</h2>
            {cursos.length === 0 ? (
                <p>No hay cursos.</p>
            ) : (
                <ul>
                    {cursos.map(curso => (
                        <li key={curso.id} style={{ margin: "0.5rem 0" }}>
                            <button onClick={() => setCursoSeleccionado(curso)}>
                                {curso.nombre_curso}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {cursoSeleccionado && (
                <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem", borderRadius: 8 }}>
                    <h3>{cursoSeleccionado.nombre_curso}</h3>
                    <p><b>Facultad:</b> {cursoSeleccionado.facultad}</p>
                    <p><b>Niveles:</b> {cursoSeleccionado.niveles.join(", ")}</p>
                    <p><b>Cupo total:</b> {cursoSeleccionado.cupo_total}</p>
                    <p><b>Fecha:</b> {cursoSeleccionado.fecha_implementacion}</p>
                    <p><b>Descripción:</b> {cursoSeleccionado.descripcion}</p>
                </div>
            )}
        </div>
    )
}

export default ViewCourses
