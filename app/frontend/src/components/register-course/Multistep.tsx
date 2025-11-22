import { useEffect, useState } from "react";
import CourseForm from "./Courses";
import ProgramContentForm from "./ProgramContent";
import WeeklyProgramForm from "./WeeklyProgram";
import StaffForm from "./Staff";
import MaterialForm from "./MaterialForm";
import { Link } from "react-router-dom";
import {
  type Staff as StaffType,
  type CourseDate,
  type DailyPlanification,
  type Material,
  type RegisterForm,
} from "../../types/course";
import courseService from "../../services/Course";
import {
  type CourseDateSchema,
  type EducationalLevelSchema,
  type FacultySchema,
} from "../../types/coursesSchema";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type FormProgress = "DONE" | "NOT_DONE";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<FormProgress>("NOT_DONE");

  // course data
  const [courseData, setCourseData] = useState({
    name: "",
    faculty: "",
    educational_level: [] as string[],
    quota: 25,
    course_start: [] as CourseDate[],
  });

  // program content data
  const [programContent, setProgramContent] = useState({
    course_purpose: "",
    learning_objectives: [] as string[],
  });

  // materials
  const [materials, setMaterials] = useState<Material[]>([]);

  // weekly planification
  const [weeklyPlanification, setWeeklyPlanification] = useState<
    DailyPlanification[]
  >([1, 2, 3, 4, 5].map((dayNumber) => ({
    day: dayNumber,
    first_period: "",
    first_classroom: "",
    second_period: "",
    second_classroom: "",
  })));

  // staff
  const [staff, setStaff] = useState<StaffType[]>([]);

  //db contents
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

  const resetForm = () => {
    setCourseData({
      name: "",
      faculty: "",
      educational_level: [] as string[],
      quota: 25,
      course_start: [] as CourseDate[],
    });

    setProgramContent({
      course_purpose: "",
      learning_objectives: [] as string[],
    });

    setMaterials([{ name: "", quantity: 0, link: "" }]);

    setWeeklyPlanification([]);

    setStaff([]);

    setEducationalLevel([]);

    setDates([]);
  };

  const steps = [
    {
      title: "Curso",
      component: (
        <CourseForm
          key="course"
          data={courseData}
          setData={setCourseData}
          educationalLevel={educationalLevel}
          faculties={faculties}
          dates={dates}
        />
      ),
    },
    {
      title: "Contenido",
      component: (
        <ProgramContentForm
          key="program"
          data={programContent}
          setData={setProgramContent}
        />
      ),
    },
    {
      title: "Materiales",
      component: (
        <MaterialForm key="materials" data={materials} setData={setMaterials} />
      ),
    },
    {
      title: "Planificación",
      component: (
        <WeeklyProgramForm
          key="weekly"
          data={weeklyPlanification}
          setData={setWeeklyPlanification}
        />
      ),
    },
    {
      title: "Personal",
      component: <StaffForm key="staff" data={staff} setData={setStaff} />,
    },
  ];

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    const newCourse: RegisterForm = {
      course_data: courseData,
      program_content: programContent,
      weekly_planification: weeklyPlanification,
      staff,
      materials,
    };

    const submit = async () => {
      try {
        const response = await courseService.postCourse(newCourse);
        console.log(response);

        setCurrentStep(0);
        resetForm();
        setFormState("DONE");
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          const message =
            error.response?.data?.error ?? "Error al iniciar sesión";
          message.split("\n").map((msg: string) => {
            if (msg.length > 0) {
              toast.error(msg, { autoClose: false, draggable: true });
            }
          });
        } else if (error instanceof Error) {
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
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-600 -translate-y-1/3"
            ></div>
            <div 
              className="absolute top-1/3 left-0 h-1 bg-[#d32390] -translate-y-1/3 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>            
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const isUpcoming = index > currentStep;
              
              return (
                <div key={index} className="flex flex-col items-center relative z-10">
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
                      <span className="drop-shadow-sm">
                        {index + 1}
                      </span>
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
          {steps[currentStep].component}
          
          <div className="nav-buttons">
            {currentStep === 0 && (
              <Link to="/" className="back-btn">
                Volver
              </Link>
            )}
            {currentStep > 0 && (
              <button className="back-btn" onClick={prev}>
                Atrás
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <>
                <button type="button" className="submit-btn">
                  Guardar
                </button>
                <button className="next-btn" onClick={next}>
                  Siguiente
                </button>
              </>
            ) : (
              <button className="submit-btn" onClick={handleSubmit}>
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