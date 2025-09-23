import  { useState } from "react";
import { employmentRelationships, getDocumentsFor, type EmploymentRelationship, type documents } from "../../../backend/data/teachers"
import "../styles/course_form.css"

const TeacherForm = () => {
    const [employment, setEmployment] = useState<EmploymentRelationship | "">("");
    const documentsToUpload: documents[] = employment ? getDocumentsFor(employment as EmploymentRelationship) : [];

    return (
        <>
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
                        />
                    </div>
                    <div className="form-row">
                        <label className="required"> Apellidos </label>
                        <input
                            id="teacher-last-name"
                            type="text"
                            name="teacherLastName"
                            required
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
                        />
                    </div>
                    <div className="form-row">
                        <label className="required">Correo Electrónico </label>
                        <input
                            id="teacher-email"
                            type="email"
                            name="teacherEmail"
                            required
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
                        />
                    </div>
                    <div className="form-row">
                        <label className="required">Relación Contractual </label>
                        <select
                            name="teacherEmployment"
                            required
                            value={employment}
                            onChange={e => setEmployment(e.target.value as EmploymentRelationship)}
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
                                {documentsToUpload.map(doc => (
                                    <li key={doc.id}>
                                        <label>
                                            {doc.nombre}
                                            <p></p>
                                            <input
                                                type="file"
                                                name={`doc${doc.id}`}
                                                required
                                            />
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
        </>
    );
};

const registerTeacher = () => {

    return (
        <form className="form-container">
            <TeacherForm />
        </form>
    )
};
export default registerTeacher;