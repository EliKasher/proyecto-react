import { useState } from "react";
import {
    employmentRelationships,
    getDocumentsFor,
    type EmploymentRelationship,
    type documents,
} from "../../../backend/data/teachers";
import "../styles/course_form.css"

const RegisterTeacher = (props: {
    setName: (arg: string) => void;
    setLastName: (arg: string) => void;
    setRun: (arg: string) => void;
    setEmail: (arg: string) => void;
    setPhoneNumber: (arg: string) => void;
    setDegree: (arg: string) => void;
    setCollegeRelationship: (arg: string) => void;
}) => {
    const [employment, setEmployment] = useState<EmploymentRelationship | "">("");
    const documentsToUpload: documents[] = employment
        ? getDocumentsFor(employment as EmploymentRelationship)
        : [];

    const handleNameChange = (name: string) => props.setName(name);
    const handleLastNameChange = (lastName: string) =>
        props.setLastName(lastName);
    const handleRunChange = (run: string) => props.setRun(run);
    const handlePhoneNumberChange = (phoneNumber: string) =>
        props.setPhoneNumber(phoneNumber);
    const handleDegreeChange = (degree: string) => props.setDegree(degree);
    const handleCollegeRelationshipChange = (collegeRelationship: string) =>
        props.setCollegeRelationship(collegeRelationship);
    const handleEmailChange = (email: string) => props.setEmail(email);

    return (
        <>
            <form className="teacher-form">
                <div className="form-section">
                    <div className="section-header">
                        <h3>Datos Profesor</h3>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <label className="required">Nombres </label>
                            <input
                                id="teacher-first-name"
                                type="text"
                                name="teacherFirstName"
                                required
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label className="required"> Apellidos </label>
                            <input
                                id="teacher-last-name"
                                type="text"
                                name="teacherLastName"
                                required
                                onChange={(e) => handleLastNameChange(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label className="required">RUT </label>
                            <input
                                id="teacher-rut"
                                type="text"
                                name="teacherRut"
                                required
                                placeholder="12345678-9"
                                onChange={(e) => handleRunChange(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label className="required">Correo Electrónico </label>
                            <input
                                id="teacher-email"
                                type="email"
                                name="teacherEmail"
                                required
                                onChange={(e) => handleEmailChange(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label className="required">Teléfono </label>
                            <input
                                id="teacher-phone"
                                type="tel"
                                name="teacherPhone"
                                required
                                placeholder="+56912345678"
                                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label className="required">Profesión/Grado Académico </label>
                            <input
                                id="teacher-degree"
                                type="text"
                                name="teacherDegree"
                                required
                                placeholder="ej: Odontólogo / Magíster en Educación"
                                onChange={(e) => handleDegreeChange(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label className="required">Relación Contractual </label>
                            <select
                                name="teacherEmployment"
                                required
                                value={employment}
                                onChange={(e) => {
                                    setEmployment(e.target.value as EmploymentRelationship);

                                    handleCollegeRelationshipChange(e.target.value);
                                }}
                            >
                                <option value="">Seleccione</option>
                                {employmentRelationships.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {employment && documentsToUpload.length > 0 && (
                            <div className="form-row">
                                <p></p>
                                <label className="required">Documentación requerida</label>
                                <ul>
                                    {documentsToUpload.map((doc) => (
                                        <li key={doc.id}>
                                            <label>
                                                {doc.nombre}
                                                <p></p>
                                                <input type="file" name={`doc-${doc.id}`} required />
                                            </label>
                                            {doc.nota && (
                                                <div className="recommendations">{doc.nota}</div>
                                            )}
                                            <p></p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
};

export default RegisterTeacher;