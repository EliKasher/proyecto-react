import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import courseService from "../../services/Course";
import teacherService from "../../services/Teacher";
import {
  type EmploymentRelationshipSchema,
  type DocumentsSchema,
} from "../../types/coursesSchema";
import type { ITeacherRegister } from "../../types/users";
import axios from "axios";

const NewTeacherRegister = () => {
  const navigate = useNavigate();

  const [newTeacher, setNewTeacher] = useState<ITeacherRegister>({
    first_name: "",
    last_name: "",
    role: "teacher",
    rut: "",
    email: "",
    phone: "",
    degree: "",
    college_relationship: "",
    password: "",
  });

  const [employmentRelationships, setEmploymentRelationships] = useState<
    EmploymentRelationshipSchema[]
  >([]);

  const [employment, setEmployment] = useState<EmploymentRelationshipSchema>();
  const [requiredDocuments, setRequiredDocuments] = useState<DocumentsSchema[]>(
    []
  );
  const [documentsToUpload, setDocumentsToUpload] = useState<DocumentsSchema[]>(
    []
  );

  useEffect(() => {
    courseService
      .getEmploymentRelationships()
      .then((relations) => setEmploymentRelationships(relations))
      .catch(() => toast.error("Error al obtener relaciones contractuales"));

    courseService
      .getRequiredDocuments()
      .then((docs) => setRequiredDocuments(docs))
      .catch(() => toast.error("Error al obtener documentos requeridos"));
  }, []);

  useEffect(() => {
    if (employment) {
      setDocumentsToUpload(
        requiredDocuments.filter((doc) =>
          employment.requirements.includes(doc.short_name)
        )
      );
    }
  }, [employment, requiredDocuments]);

  const handleChange = (field: keyof ITeacherRegister, value: string) => {
    setNewTeacher({ ...newTeacher, [field]: value });
  };

  const handleEmploymentChange = (value: string) => {
    setEmployment(
      employmentRelationships.find((rel) => rel.relation === value)
    );
    handleChange("college_relationship", value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await teacherService.postTeacher(newTeacher);
      toast.success("Registro Exitoso");
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error ?? "Error al registrar";
        toast.error(message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="section-header">
          <h3>Datos Profesor</h3>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label className="required">Nombres</label>
            <input
              id="teacher-first-name"
              type="text"
              value={newTeacher.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Apellidos</label>
            <input
              id="teacher-last-name"
              type="text"
              value={newTeacher.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">RUT</label>
            <input
              id="teacher-rut"
              type="text"
              value={newTeacher.rut}
              placeholder="12345678-9"
              onChange={(e) => handleChange("rut", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Correo Electrónico</label>
            <input
              id="teacher-email"
              type="email"
              value={newTeacher.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Contraseña</label>
            <input
              id="teacher-password"
              type="password"
              value={newTeacher.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Teléfono</label>
            <input
              id="teacher-phone"
              type="tel"
              value={newTeacher.phone}
              placeholder="+56 912345678"
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Profesión/Grado Académico</label>
            <input
              id="teacher-degree"
              type="text"
              value={newTeacher.degree}
              placeholder="ej: Odontólogo / Magíster en Educación"
              onChange={(e) => handleChange("degree", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Relación Contractual</label>
            <select
              value={employment?.relation}
              onChange={(e) => handleEmploymentChange(e.target.value as string)}
              required
            >
              <option value="">Seleccione</option>
              <option value="other">Otro</option>
              {employmentRelationships.map((item, index) => (
                <option key={index} value={item.relation}>
                  {item.relation}
                </option>
              ))}
            </select>
          </div>

          {employment && documentsToUpload.length > 0 && (
            <div className="form-row">
              <label className="required">Documentación requerida</label>
              <ul>
                {documentsToUpload.map((doc) => (
                  <li key={doc.short_name}>
                    <label>
                      {doc.short_name}
                      <input
                        type="file"
                        name={`doc-${doc.short_name}`}
                        required
                      />
                    </label>
                    {doc.note && (
                      <div className="recommendations">{doc.note}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewTeacherRegister;
