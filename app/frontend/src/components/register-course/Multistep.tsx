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
  >([]);

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
    <CourseForm
      key="course"
      data={courseData}
      setData={setCourseData}
      educationalLevel={educationalLevel}
      faculties={faculties}
      dates={dates}
    />,
    <ProgramContentForm
      key="program"
      data={programContent}
      setData={setProgramContent}
    />,
    <MaterialForm key="materials" data={materials} setData={setMaterials} />,
    <WeeklyProgramForm
      key="weekly"
      data={weeklyPlanification}
      setData={setWeeklyPlanification}
    />,
    <StaffForm key="staff" data={staff} setData={setStaff} />,
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
        {steps[currentStep]}
        <div className="nav-buttons">
          {currentStep === 0 && <Link to="/">Volver</Link>}
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
    );
  }

  return (
    <div>
      <h1>Curso registrado con éxito.</h1>
      <Link to="/">Volver a inicio</Link>
      <button onClick={() => setFormState("NOT_DONE")}>
        Registrar otro curso.
      </button>
    </div>
  );
}
