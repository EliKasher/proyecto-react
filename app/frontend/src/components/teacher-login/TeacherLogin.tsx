import React, { useState } from "react";
import { toast } from "react-toastify";
import loginService from "../../services/Login";

import { setUser } from "../../reducers/userReducer";

import type { ILogin } from "../../types/users";

import { useDispatch } from "react-redux";

import { AxiosError } from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const TeacherLogin = () => {
  const dispatch = useDispatch();
  const [teacherCredentials, setTeacherCredentials] = useState<ILogin>({
    rut: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (field: keyof ILogin, value: string) => {
    setTeacherCredentials({ ...teacherCredentials, [field]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.teacherLogin(teacherCredentials);
      dispatch(setUser({ ...user, logged: true }));
      toast.success(`Bienvenido ${user.first_name}`);
    } catch (err) {
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
              type={showPassword ? "text" : "password"}
              value={teacherCredentials.password}
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
