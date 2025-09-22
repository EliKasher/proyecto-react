import React, { useState } from "react";
import MaterialForm from "./MaterialForm";
import CourseForm from "./Courses";
import RegisterTeacher from "./RegisterTeacher";
import WeeklyProgramForm from "./WeeklyProgram";
import { Link } from "react-router";


export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    materiales: [],
    curso: "",
    profesor: "",
    // ... lo que vayas necesitando
  });

  const steps = [
    <CourseForm key="course" />,
    <RegisterTeacher key="teacher" />,
    <MaterialForm key="materials" />,
    <WeeklyProgramForm key="weekly" />
  ];

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    console.log("Datos finales:", formData);
  };

  return (
    <div>
      {steps[currentStep]}
      <div className="nav-buttons">
        {currentStep === 0 && <Link to="/">Volver</Link>}
        {currentStep > 0 && <button onClick={prev}>Atrás</button>}
        {currentStep < steps.length - 1 ? (
          <button onClick={next}>Siguiente</button>
        ) : (
          <button onClick={handleSubmit}>Enviar</button>
        )}
      </div>
    </div>
  );
}
