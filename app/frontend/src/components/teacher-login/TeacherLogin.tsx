import { useState } from "react";
import teacherService from "../../services/Teacher";
import { type ITeacherLogin } from "../../types/teacher";

const TeacherLogin = () => {

  const [teacherCredentials, setTeacherCredentials] = useState<ITeacherLogin>({
    rut: "",
    password: "",
  });


  const handleChange = (field: keyof ITeacherLogin, value: string) => {
    setTeacherCredentials({ ...teacherCredentials, [field]: value });
  };

 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    teacherService.teacherLogin(teacherCredentials);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="section-header">
          <h3>Datos Profesor</h3>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label className="required">RUT</label>
            <input
              id="teacher-rut"
              type="text"
              value={teacherCredentials.rut}
              placeholder="12345678-9"
              onChange={(e) => handleChange("rut", e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="required">Contraseña</label>
            <input
              id="teacher-password"
              type="password"
              value={teacherCredentials.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Entrar
          </button>
        </div>
      </div>
    </form>
  );
};

export default TeacherLogin;
