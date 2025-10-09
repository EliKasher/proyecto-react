import { useState } from "react";
import { type Teacher } from "../types/course";
import {
  type DocumentsRequiredByEmploymentRelationshipsSchema,
  type EmploymentRelationshipSchema,
  type RequiredDocumentsSchema,
} from "../types/coursesSchema";

type Props = {
  data: Teacher;
  setData: React.Dispatch<React.SetStateAction<Teacher>>;
  employmentRelationships: EmploymentRelationshipSchema[];
  requiredDocuments: RequiredDocumentsSchema[];
  documentsRequiredByEmploymentRelationship: DocumentsRequiredByEmploymentRelationshipsSchema[];
};

const RegisterTeacher = ({
  data,
  setData,
  employmentRelationships,
  requiredDocuments,
  documentsRequiredByEmploymentRelationship,
}: Props) => {
  const [employment, setEmployment] = useState<string>(
    data.college_relationship || ""
  );

  const getDocumentsFor = (rel: string): RequiredDocumentsSchema[] => {
    const requirements:
      | DocumentsRequiredByEmploymentRelationshipsSchema
      | undefined = documentsRequiredByEmploymentRelationship.find(
        (relation) => relation.id === rel
      );

    if (requirements) {
      return requiredDocuments.filter((document) => {
        return requirements.requerimientos.find(
          (req) => req === document.id
        ) === undefined
          ? false
          : true;
      });
    }
    return [];
  };

  const documentsToUpload: RequiredDocumentsSchema[] = employment
    ? getDocumentsFor(employment as string)
    : [];

  const handleChange = (field: keyof Teacher, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleEmploymentChange = (value: string) => {
    setEmployment(value);
    handleChange("college_relationship", value);
  };

  return (
    <form className="form-container">
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
              value={data.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Apellidos</label>
            <input
              id="teacher-last-name"
              type="text"
              value={data.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">RUT</label>
            <input
              id="teacher-rut"
              type="text"
              value={data.rut}
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
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Teléfono</label>
            <input
              id="teacher-phone"
              type="tel"
              value={data.phone}
              placeholder="+56912345678"
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Profesión/Grado Académico</label>
            <input
              id="teacher-degree"
              type="text"
              value={data.degree}
              placeholder="ej: Odontólogo / Magíster en Educación"
              onChange={(e) => handleChange("degree", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Relación Contractual</label>
            <select
              value={employment}
              onChange={(e) => handleEmploymentChange(e.target.value as string)}
              required
            >
              <option value="">Seleccione</option>
              {employmentRelationships.map((item, index) => (
                <option key={index} value={item.relacion}>
                  {item.relacion}
                </option>
              ))}
            </select>
          </div>

          {employment && documentsToUpload.length > 0 && (
            <div className="form-row">
              <label className="required">Documentación requerida</label>
              <ul>
                {documentsToUpload.map((doc) => (
                  <li key={doc.id}>
                    <label>
                      {doc.id}
                      <input type="file" name={`doc-${doc.id}`} required />
                    </label>
                    {doc.nota && (
                      <div className="recommendations">{doc.nota}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterTeacher;
