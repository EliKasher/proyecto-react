import React, { useState } from "react";
import CourseForm from "./Courses";
import ProgramContentForm from "./ProgramContent";
import RegisterTeacher from "./RegisterTeacher";
import WeeklyProgramForm from "./WeeklyProgram";
import StaffForm from "./Staff"
import MaterialForm from "./MaterialForm";
import { Link, useSearchParams } from "react-router";
import { Staff as StaffType, CourseDate, DailyPlanification, Material, InscryptionForm } from "../types/course";
import courseService from "../services/Course";
import "../styles/course_form.css";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  // course data
  const [name, setName] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");
  const [educationalLevels, setEducationalLevels] = useState<string[]>([]);
  const [quota, setQuota] = useState<number>(25);
  const [date, setDate] = useState<CourseDate[]>([]);

  // program content data
  const [coursePurpose, setCoursePurpose] = useState<string>("");
  const [objectives, setObjectives] = useState<string[]>([]);

  // teacher data

  const [teacherName, setTeacherName] = useState<string>("");
  const [teacherLastName, setTeacherLastName] = useState<string>("");
  const [teacherRun, setTeacherRun] = useState<string>("12345678-9");
  const [teacherEmail, setTeacherEmail] = useState<string>("");
  const [teacherPhoneNumber, setTeacherPhoneNumber] = useState<string>("");
  const [teacherDegree, setTeacherDegree] = useState<string>("");
  const [teacherCollegeRelationship, setTeacherCollegeRelationship] =
    useState<string>("");

  // materials

  const [materials, setMaterials] = useState<Material[]>([
    { name: "", quantity: 0, link: "" },
  ]);

  // weekly planification

  const [weeklyPlanification, setWeeklyPlanification] = useState<DailyPlanification[]>([]);

  // docentes

  const [staff, setStaff] = useState<StaffType[]>([]);

  // materiales

  const [formData, setFormData] = useState({
    materiales: [],
    curso: "",
    profesor: "",
    // ... lo que vayas necesitando
  });

  const steps = [
    <CourseForm
      key="course"
      setName={setName}
      courseDate={date}
      setDate={setDate}
      educationalLevels={educationalLevels}
      setEducationalLevel={setEducationalLevels}
      setFaculty={setFaculty}
      setQuota={setQuota}
    />,
    <ProgramContentForm
      key="program"
      coursePurpose={coursePurpose}
      objectives={objectives}
      setCoursePurpose={setCoursePurpose}
      setObjectives={setObjectives}
    />,
    <RegisterTeacher
      key="teacher"
      setCollegeRelationship={setTeacherCollegeRelationship}
      setDegree={setTeacherDegree}
      setEmail={setTeacherEmail}
      setLastName={setTeacherLastName}
      setName={setTeacherName}
      setPhoneNumber={setTeacherPhoneNumber}
      setRun={setTeacherRun}
    />,
    <MaterialForm
      key="materials"
      materials={materials}
      setMaterials={setMaterials}
    />,
    <WeeklyProgramForm
      key="weekly" 
      weeklyPlanification={weeklyPlanification} 
      setWeeklyPlanification={setWeeklyPlanification}
    />,
    <StaffForm
      key="staff"
      staff={staff}
      setStaff={setStaff}
    />,
  ];

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {

    const newCourse: InscryptionForm = {
      course_data: {
        name: name,
        faculty: faculty,
        educational_level: educationalLevels,
        quota: quota,
        course_start: date,
      },
      program_content: {
        course_purpose: "",
        learning_objectives: []
      },
      weekly_planification: weeklyPlanification,
      teachers_data: {
        first_name: teacherName,
        last_name: teacherLastName,
        rut: teacherRun,
        email: teacherEmail,
        phone: teacherPhoneNumber,
        degree: teacherDegree,
        college_relationship: teacherCollegeRelationship
      },
      staff: [],
      materials: materials

    }

    courseService.postCourse(newCourse).then((response) => console.log(response))
    

    console.log("Datos finales:", formData);
  };

  return (
    <div className="multistep">
      {steps[currentStep]}
      <div className="nav-buttons">
        {currentStep === 0 && <Link to="/">Volver</Link>}
        {currentStep > 0 && <button className="back-btn" onClick={prev}>Atrás</button>}
        {currentStep < steps.length - 1 ? (
          <button className="next-btn" onClick={next}>Siguiente</button>
        ) : (
          <button className="submit-btn" onClick={handleSubmit}>Enviar</button>
        )}
      </div>
    </div>
  );
}
