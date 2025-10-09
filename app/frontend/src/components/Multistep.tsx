import { useEffect, useState } from "react";
import CourseForm from "./Courses";
import ProgramContentForm from "./ProgramContent";
import RegisterTeacher from "./RegisterTeacher";
import WeeklyProgramForm from "./WeeklyProgram";
import StaffForm from "./Staff";
import MaterialForm from "./MaterialForm";
import { Link } from "react-router";
import {
  type Staff as StaffType,
  type CourseDate,
  type DailyPlanification,
  type Material,
  type RegisterForm,
} from "../types/course";
import courseService from "../services/Course";
import {
  type CourseDateSchema,
  type DocumentsRequiredByEmploymentRelationshipsSchema,
  type EducationalLevelSchema,
  type EmploymentRelationshipSchema,
  type FacultySchema,
  type RequiredDocumentsSchema,
} from "../types/coursesSchema";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

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

  // teacher data
  const [teacherData, setTeacherData] = useState({
    first_name: "",
    last_name: "",
    rut: "",
    email: "",
    phone: "",
    degree: "",
    college_relationship: "",
  });

  // materials
  const [materials, setMaterials] = useState<Material[]>([
    { name: "", quantity: 0, link: "" },
  ]);

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

  const [employmentRelationships, setEmploymentRelationships] = useState<
    EmploymentRelationshipSchema[]
  >([]);

  const [requiredDocuments, setRequiredDocuments] = useState<
    RequiredDocumentsSchema[]
  >([]);

  const [
    documentsRequiredByEmploymentRelationship,
    setDocumentsRequiredByEmploymentRelationship,
  ] = useState<DocumentsRequiredByEmploymentRelationshipsSchema[]>([]);

  useEffect(() => {
    courseService
      .getEducationalLevels()
      .then((data) => setEducationalLevel(data));

    courseService.getCourseDates().then((data) => setDates(data));

    courseService.getFaculties().then((data) => setFaculties(data));

    courseService
      .getEmploymentRelationships()
      .then((data) => setEmploymentRelationships(data));

    courseService
      .getRequiredDocuments()
      .then((data) => setRequiredDocuments(data));

    courseService
      .getDocumentsRequiredByEmploymentRelationships()
      .then((data) => setDocumentsRequiredByEmploymentRelationship(data));
  }, []);

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
    <RegisterTeacher
      key="teacher"
      data={teacherData}
      setData={setTeacherData}
      employmentRelationships={employmentRelationships}
      requiredDocuments={requiredDocuments}
      documentsRequiredByEmploymentRelationship={
        documentsRequiredByEmploymentRelationship
      }
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
      teachers_data: teacherData,
      staff,
      materials,
    };

    courseService
      .postCourse(newCourse)
      .then((response) => console.log(response));
  };

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
