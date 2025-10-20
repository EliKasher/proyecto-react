import { useState } from "react";
import { toast } from "react-toastify";
import loginService from "../../services/Login";

import type { ILogin } from "../../types/users";
import type { Teacher } from "../../App";
import { AxiosError } from "axios";

interface TeacherLoginProps {
  onLogin: (user: Teacher) => void;
}

const TeacherLogin = ({ onLogin }: TeacherLoginProps) => {
  const [teacherCredentials, setTeacherCredentials] = useState<ILogin>({
    rut: "",
    password: "",
  });

  const handleChange = (field: keyof ILogin, value: string) => {
    setTeacherCredentials({ ...teacherCredentials, [field]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.teacherLogin(teacherCredentials);
      onLogin(user);
      toast.success(`Bienvenido ${user.first_name}`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.error ?? "Error al iniciar sesión";
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
          <h3>Ingreso Profesor</h3>
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
