import { toast } from "react-toastify";
import loginService from "../../services/Login";

import type { ILogin } from "../../types/users";
import type { Functionary } from "../../App";
import { AxiosError } from "axios";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useState} from "react";

interface FunctionaryLoginProps {
    onLogin: (user: Functionary) => void;
}

const FunctionaryLogin = ({ onLogin }: FunctionaryLoginProps) => {
    const [functionaryCredentials, setFunctionaryCredentials] = useState<ILogin>({
        rut: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (field: keyof ILogin, value: string) => {
        setFunctionaryCredentials({ ...functionaryCredentials, [field]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await loginService.functionaryLogin(functionaryCredentials);
            onLogin(user);
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
                    <h3>Ingreso Funcionario EdV</h3>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <label className="required">RUT</label>
                        <input
                            id="functionary-rut"
                            type="text"
                            value={functionaryCredentials.rut}
                            placeholder="12345678-9"
                            onChange={(e) => handleChange("rut", e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label className="required">Contraseña</label>
                        <input
                            id="functionary-password"
                            type={showPassword ? "text" : "password"}
                            value={functionaryCredentials.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="password-toggle-btn"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
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

export default FunctionaryLogin;
