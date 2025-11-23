import * as React from "react";
import teacherService from "../../services/Teacher";
import { type RegisterForm } from "../../types/course";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { AppState } from "../../store";
import { useDispatch } from "react-redux";
import { setForm } from "../../reducers/formReducer";
import { useNavigate } from "react-router-dom";



type Curso = RegisterForm

const ViewCourses = () => {
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cursos, setCursos] = React.useState<Curso[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const setup = async () => {
      try {
        const cursos = await teacherService.getTeacherCourses(user.id);
        setCursos(cursos);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setup();
  }, [user.id]);

  const [cursoSeleccionado, setCursoSeleccionado] =
    React.useState<Curso | null>(null);

  const handleContinueForm = (curso: Curso) => {

    if (curso.state === 0) {
      dispatch(setForm({ ...curso, currentPageNumber: 0, currentPageIsValid: false }));
      navigate("/course-form", { replace: false })
    }

  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0f0c29] to-[#47308b] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b83284] mx-auto"></div>
            <p className="mt-4 text-[#f0f0f5]">Cargando cursos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#f0f0f5] mb-4">Mis Cursos</h1>
          <p className="text-lg text-[#e8e7f0]">
            Gestiona y visualiza todos tus cursos
          </p>
        </div>

        {cursos.length === 0 ? (
          <div className="bg-[#16106b] rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] p-12 text-center border border-[rgba(123,108,246,0.5)]">
            <div className="text-[#a685ff] mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f0f0f5] mb-2">
              No hay cursos.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#16106b] rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] p-6 border border-[rgba(123,108,246,0.5)]">
                <div className="space-y-3">
                  {cursos.map((curso) => (
                    <button
                      key={curso.id}
                      onClick={() => setCursoSeleccionado(curso)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${cursoSeleccionado?.id === curso.id
                        ? 'bg-[rgba(184,50,132,0.2)] border border-[rgba(184,50,132,0.5)] shadow-[0_4px_15px_rgba(184,50,132,0.4)]'
                        : 'bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(184,50,132,0.1)] hover:border-[rgba(184,50,132,0.3)]'
                        }`}
                    >
                      {curso.state === 0 && (
                        <button onClick={() =>
                          handleContinueForm(curso)
                        }>
                          Completar
                        </button>
                      )}
                      <h3 className="font-semibold text-[#f0f0f5] mb-1 line-clamp-2 wrap-break-word">
                        {curso.course_data.name}
                      </h3>
                      <p className="text-sm text-[#a685ff] line-clamp-1 wrap-break-word">
                        {curso.course_data.faculty}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-[#e8e7f0] bg-[rgba(123,108,246,0.2)] px-2 py-1 rounded">
                          {curso.course_data.quota} cupos
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-[#e8e7f0] bg-[rgba(123,108,246,0.2)] px-2 py-1 rounded">
                          {curso.state === 1 ? "Registrado" : "Incompleto"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {cursoSeleccionado ? (
                <div className="bg-[#16106b] rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] p-8 border border-[rgba(123,108,246,0.5)]">
                  <div className="border-b border-[rgba(123,108,246,0.5)] pb-6 mb-6">
                    <h2 className="text-2xl font-bold text-[#f0f0f5] mb-2 line-clamp-2 wrap-break-word">
                      {cursoSeleccionado.course_data.name}
                    </h2>
                    <p className="text-lg text-[#a685ff] line-clamp-2 wrap-break-word">
                      {cursoSeleccionado.course_data.faculty}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-[#f0f0f5] border-b border-[rgba(123,108,246,0.5)] pb-2">
                        Información del Curso
                      </h3>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#a685ff]">Niveles Educativos</label>
                        <div className="flex flex-wrap gap-2">
                          {cursoSeleccionado.course_data.educational_level.map((nivel, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[rgba(123,108,246,0.2)] text-[#7b6cf6] border border-[rgba(123,108,246,0.5)]"
                            >
                              {nivel}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#a685ff]">Cupo Total</label>
                        <div className="flex items-center space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]">
                          <svg className="w-5 h-5 text-[#7b6cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-[#f0f0f5]">{cursoSeleccionado.course_data.quota} estudiantes</p>
                        </div>
                      </div>

                      {cursoSeleccionado.course_data.course_start.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#a685ff]">Fechas del Curso</label>
                          <div className="space-y-3">
                            {cursoSeleccionado.course_data.course_start.map((fecha, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]"
                              >
                                <svg className="w-5 h-5 text-[#7b6cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div>
                                  <p className="text-[#f0f0f5] text-sm">
                                    Del {fecha.start_date} de {fecha.start_month} al {fecha.end_date} de {fecha.end_month}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-[#f0f0f5] border-b border-[rgba(123,108,246,0.5)] pb-2">
                        Contenido del Programa
                      </h3>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#a685ff]">Propósito del Curso</label>
                        <div className="p-4 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]">
                          <p className="text-[#f0f0f5] leading-relaxed wrap-break-word whitespace-pre-wrap">
                            {cursoSeleccionado.program_content.course_purpose}
                          </p>
                        </div>
                      </div>

                      {cursoSeleccionado.program_content.learning_objectives.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#a685ff]">Objetivos de Aprendizaje</label>
                          <div className="space-y-2">
                            {cursoSeleccionado.program_content.learning_objectives.map((objetivo, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]"
                              >
                                <svg className="w-4 h-4 text-[#b83284] mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <p className="text-[#f0f0f5] text-sm wrap-break-word whitespace-pre-wrap">{objetivo}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#16106b] rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] p-12 text-center border border-[rgba(123,108,246,0.5)] h-full flex items-center justify-center">
                  <div>
                    <div className="text-[#a685ff] mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#f0f0f5] mb-2">
                      Selecciona un curso
                    </h3>
                    <p className="text-[#e8e7f0]">
                      Elige un curso de la lista para ver sus detalles
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCourses;
