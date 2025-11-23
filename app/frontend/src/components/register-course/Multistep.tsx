import { useEffect, useState } from "react";
import CourseForm from "./Courses";
import ProgramContentForm from "./ProgramContent";
import WeeklyProgramForm from "./WeeklyProgram";
import StaffForm from "./Staff";
import MaterialForm from "./MaterialForm";
import { Link } from "react-router-dom";
import { type RegisterForm } from "../../types/course";
import courseService from "../../services/Course";
import {
  type CourseDateSchema,
  type EducationalLevelSchema,
  type FacultySchema,
} from "../../types/coursesSchema";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  decreasePage,
  increasePage,
  resetForm,
  setShowErrors,
} from "../../reducers/formReducer";
import type { AppState } from "../../store";


type FormProgress = "DONE" | "NOT_DONE";

export default function MultiStepForm() {

  const dispatch = useDispatch();

  const newCourse: RegisterForm = useSelector((state: AppState) => state.form);
  const currentStep = newCourse.currentPageNumber;

  const [formState, setFormState] = useState<FormProgress>("NOT_DONE");
  const [faculties, setFaculties] = useState<FacultySchema[]>([]);
  const [educationalLevel, setEducationalLevel] = useState<
    EducationalLevelSchema[]
  >([]);
  const [dates, setDates] = useState<CourseDateSchema[]>([]);

  useEffect(() => {
    courseService
      .getEducationalLevels()
      .then((data) => setEducationalLevel(data));

    courseService.getCourseDates().then((data) => setDates(data));

    courseService.getFaculties().then((data) => setFaculties(data));
  }, []);

  const steps = [
    {
      title: "Curso",
      component: (
        <CourseForm
          key="course"
          educationalLevels={educationalLevel}
          faculties={faculties}
          dates={dates}
          data={newCourse.course_data}
          showErrors={newCourse.showErrors}
          isValid={newCourse.currentPageIsValid}
        />
      ),
    },
    {
      title: "Contenido",
      component: (
        <ProgramContentForm
          key="program"
          data={newCourse.program_content}
          isValid={newCourse.currentPageIsValid}
          showErrors={newCourse.showErrors}
        />
      ),
    },
    {
      title: "Materiales",
      component: (
        <MaterialForm
          key="materials"
          data={newCourse.materials}
          isValid={newCourse.currentPageIsValid}
          showErrors={newCourse.showErrors}
        />
      ),
    },
    {
      title: "Planificación",
      component: (
        <WeeklyProgramForm
          key="weekly"
          data={newCourse.weekly_planification}
          isValid={newCourse.currentPageIsValid}
          showErrors={newCourse.showErrors}
        />
      ),
    },
    {
      title: "Personal",
      component: (
        <StaffForm
          key="staff"
          data={newCourse.staff}
          isValid={newCourse.currentPageIsValid}
          showErrors={newCourse.showErrors}
        />
      ),
    },
  ];

  const handleSubmit = (state: number) => {
    if (
      newCourse.currentPageNumber != steps.length - 1 && state == 1 // trying to save an incomplete form
    ) {
      dispatch(setShowErrors(true));
      return;
    }

    const submit = async () => {
      try {

        const toSave = { ...newCourse, state };

        if (toSave.id) { // called when an id exits 
          await courseService.putCourse(toSave);
        } else {
          await courseService.postCourse(toSave); // called when id is null
        }
        dispatch(resetForm());
        setFormState("DONE");
      } catch (error) {

        if (error instanceof AxiosError) {
          const data = (error.response?.data as any)?.error?.errors;
          if (data && typeof data === "object") {
            const paths: string[] = Object.keys(data);
            console.log(paths);
            dispatch(setShowErrors(true))
          }
        }
        else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error desconocido");
        }
      }
    };

    submit();
  };

  if (formState === "NOT_DONE") {
    return (
      <div className="multistep">
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#d32390] -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const isUpcoming = index > currentStep;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center relative z-10"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all duration-300
                        shadow-lg backdrop-blur-sm 
                      ${isCompleted
                        ? "bg-linear-to-br from-[#b83284] to-[#d32390] border-[#d32390] text-white shadow-[0_8px_25px_rgba(184,50,132,0.4)]"
                        : isActive
                          ? "bg-linear-to-br from-[#7b6cf6] to-[#5a3db0] border-[#7b6cf6] text-white shadow-[0_8px_25px_rgba(123,108,246,0.4)]"
                          : "bg-[#16106b] border-[#a685ff] border-opacity-30 text-[#a685ff] shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                      }
                      ${isUpcoming ? "opacity-70" : ""}
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="drop-shadow-sm">{index + 1}</span>
                    )}
                  </div>

                  <span
                    className={`mt-2 text-xs font-semibold text-center max-w-24 transition-all duration-300 
                        ${isCompleted
                        ? "text-[#d32390] drop-shadow-sm"
                        : isActive
                          ? "text-[#a685ff] drop-shadow-sm"
                          : "text-[#f0f0f5] text-opacity-60"
                      }
                      `}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="multistep">
          {newCourse.id !== null && (
            <div>
              <p>Se encuentra modificando un curso existente.</p>
              <button onClick={() => dispatch(resetForm())}>
                Descartar cambios y crear curso nuevo
              </button>
            </div>
          )}
          {steps[currentStep].component}

          <div className="nav-buttons">
            {currentStep === 0 && (
              <Link to="/" className="back-btn">
                Volver
              </Link>
            )}
            {currentStep > 0 && (
              <button
                className="back-btn"
                onClick={() => dispatch(decreasePage())}
              >
                Atrás
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <>
                <button type="button" className="submit-btn"
                  onClick={() => handleSubmit(0)}>
                  Guardar
                </button>
                <button
                  className="next-btn"
                  onClick={() => dispatch(increasePage())}
                >
                  Siguiente
                </button>
              </>
            ) : (
              <button className="submit-btn" onClick={() => handleSubmit(1)}>
                Enviar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-text-creme mb-6">
        Curso registrado con éxito.
      </h1>
      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="bg-blue-button text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Volver a inicio
        </Link>
        <button
          onClick={() => setFormState("NOT_DONE")}
          className="bg-accent-light text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Registrar otro curso
        </button>
      </div>
    </div>
  );
}
