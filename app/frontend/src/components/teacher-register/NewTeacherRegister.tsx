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
import { Visibility, VisibilityOff } from "@mui/icons-material";

function validateRut(rut: string): Boolean {
  const cleanRut = rut.toLowerCase().replace(/[^0-9k-]/g, "");

  if (cleanRut.length < 2) return false;

  const [digits, lastDigit] = cleanRut.toLowerCase().split("-");
  if (!digits || !lastDigit) return false;

  const reverseDigits = digits.split("").reverse();

  const digitsMultiplied = reverseDigits.map(
    (digit, index) => Number(digit) * (2 + (index % 6))
  );

  const sum = digitsMultiplied.reduce((acc, val) => acc + val, 0);
  const mod = sum % 11;
  const check = 11 - mod;

  const expected = check === 11 ? "0" : check === 10 ? "k" : String(check);

  return lastDigit === expected;
}

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
    confirm_password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "email":
        if (!value) return "El email es requerido";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
        return "";

      case "rut":
        if (!value) return "El RUT es requerido";
        if (!/^[0-9]{7,8}-[0-9kK]{1}$/.test(value))
          return "Formato: 12345678-K";
        if (!validateRut(value)) return "RUT inválido";
        return "";

      case "password":
        if (!value) return "La contraseña es requerida";
        if (value.length < 6) return "Mínimo 6 caracteres";
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(value))
          return "Debe tener al menos 1 minúscula, 1 mayúscula y 1 número";
        return "";

      case "confirm_password":
        if (value !== newTeacher.password)
          return "Las contraseñas no coinciden";
        return "";

      case "phone":
        if (!value) return "El teléfono es requerido";
        if (!/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/.test(value))
          return "Formato: (+56) 912345678";
        return "";

      default:
        return "";
    }
  };

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

  const [showPassword, setShowPassword] = useState(false);

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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (field: keyof ITeacherRegister, value: string) => {
    setNewTeacher({ ...newTeacher, [field]: value });

    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateForm = (): Boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(newTeacher).forEach((field) => {
      const error = validateField(
        field,
        newTeacher[field as keyof ITeacherRegister]
      );
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      if (!validateForm()) {
        toast.error("Por favor corrige los errores en el formulario");
        return;
      } else if (axios.isAxiosError(err)) {
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
            {errors.rut && <span className="error-message">{errors.rut}</span>}
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
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-row">
            <label className="required">Contraseña</label>
            <input
              id="teacher-password"
              type={showPassword ? "text" : "password"}
              value={newTeacher.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="password-toggle-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-row">
            <label className="required">Confirmar Contraseña</label>
            <input
              id="teacher-confirm-password"
              type="password"
              onChange={(e) => handleChange("confirm_password", e.target.value)}
              required
            />
            {errors.confirm_password && (
              <span className="error-message">{errors.confirm_password}</span>
            )}
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
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
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
