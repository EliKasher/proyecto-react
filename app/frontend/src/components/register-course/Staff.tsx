import { type Staff } from "../../types/course";
import { useDispatch } from "react-redux";
import {
  setStaff,
  addStaff,
  removeStaff,
  updateIsValid,
} from "../../reducers/formReducer";
import {
  validateRut,
  validatePhone,
  validateEmail,
} from "../../utils/validators";

type Props = {
  data: Staff[];
  isValid: boolean;
  showErrors: boolean;
};

const StaffForm = ({ data, isValid, showErrors }: Props) => {
  const dispatch = useDispatch();

  const handleChangeStaff = (
    index: number,
    field: keyof Staff,
    value: string
  ) => {
    const updatedStaff = data.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    dispatch(setStaff(updatedStaff));
  };

  const handleAddStaff = () => {
    dispatch(
      addStaff({
        first_name: "",
        last_name: "",
        rut: "",
        email: "",
        phone: "",
        position: "",
      })
    );
  };

  const handleRemoveStaff = (index: number) => {
    if (data.length <= 0) return;
    dispatch(removeStaff(index));
  };

  const errors = Array.from({ length: data.length }, () => ({
    firstNameError: "",
    lastNameError: "",
    rutError: "",
    emailError: "",
    phoneError: "",
  }));

  const max = 50;

  const validate = () => {
    if (data.length === 0) return true;

    let errorCount = 0;

    for (let i = 0; i < data.length; i++) {
      const staffMember = data[i];

      if (staffMember.first_name.length == 0) {
        errors[i].firstNameError = "Por favor introduzca un nombre.";
        errorCount++;
      } else if (staffMember.first_name.length > max) {
        errors[i].firstNameError =
          "El largo del o los nombres no puede superar los " +
          max +
          " carácteres";
        errorCount++;
      }

      if (staffMember.last_name.length == 0) {
        errors[i].lastNameError = "Por favor introduzca uno o mas apellidos.";
        errorCount++;
      } else if (staffMember.last_name.length > max) {
        errors[i].lastNameError =
          "El largo del o los apellidos no puede superar los " +
          max +
          " carácteres.";
        errorCount++;
      }

      const { isValid, msg } = validateRut(staffMember.rut);

      if (!isValid) {
        errors[i].rutError = msg;
        errorCount++;
      }

      if (!validateEmail(staffMember.email)) {
        errors[i].emailError = "Email inválido";
        errorCount++;
      }

      if (!validatePhone(staffMember.phone)) {
        errors[i].phoneError = "El teléfono es inválido";
        errorCount++;
      }
    }
    return errorCount === 0;
  };

  const status = validate();

  if (status != isValid) dispatch(updateIsValid(status));

  return (
    <form className="form-container">
      <div className="form-section">
        <div className="section-header">
          <h3>Equipo Docente del Curso</h3>
          <p className="recommendations">
            Estos datos se utilizarán para la gestión del curso y el
            procesamiento de pagos. En el caso de los miembros que reciban pagos
            por beca laboral o convenio, será responsabilidad del equipo docente
            completar los formularios correspondientes con sus documentos, a fin
            de no retrasar dichos pagos.
          </p>
        </div>

        {data.map((member, index) => (
          <div key={index} className="card">
            <div className="card-section-header">
              <h2>Docente {index + 1}</h2>
              {data.length > 0 && (
                <span
                  onClick={() => handleRemoveStaff(index)}
                  className="cancel-btn"
                >
                  <img src="close.svg" alt="Eliminar Docente" />
                </span>
              )}
            </div>

            <div className="form-card-group">
              <div className="form-column">
                <label className="required">Nombres</label>
                <input
                  type="text"
                  value={member.first_name}
                  onChange={(e) =>
                    handleChangeStaff(index, "first_name", e.target.value)
                  }
                  required
                />
                <p className="recommendations">
                  {member.first_name.length}/{max}
                </p>
                {showErrors && errors[index].firstNameError && (
                  <p className="error-message">{errors[index].firstNameError}</p>
                )}
              </div>
              <div className="form-column">
                <label className="required">Apellidos</label>
                <input
                  type="text"
                  value={member.last_name}
                  onChange={(e) =>
                    handleChangeStaff(index, "last_name", e.target.value)
                  }
                  required
                />
                <p className="recommendations">
                  {member.last_name.length}/{max}
                </p>
                {showErrors && errors[index].lastNameError && (
                  <p className="error-message">{errors[index].lastNameError}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <label className="required">RUT</label>
              <input
                type="text"
                value={member.rut}
                placeholder="12345678-9"
                onChange={(e) =>
                  handleChangeStaff(index, "rut", e.target.value)
                }
                required
              />
              {showErrors && errors[index].rutError && (
                <p className="error-message">{errors[index].rutError}</p>
              )}
            </div>

            <div className="form-row">
              <label className="required">Correo Electrónico</label>
              <input
                type="email"
                value={member.email}
                onChange={(e) =>
                  handleChangeStaff(index, "email", e.target.value)
                }
                required
              />
              {showErrors && errors[index].emailError && (
                <p className="error-message">{errors[index].emailError}</p>
              )}
            </div>

            <div className="form-row">
              <label className="required">Teléfono</label>
              <input
                type="tel"
                value={member.phone}
                placeholder="+56912345678"
                onChange={(e) =>
                  handleChangeStaff(index, "phone", e.target.value)
                }
                required
              />
              {showErrors && errors[index].phoneError && (
                <p className="error-message">{errors[index].phoneError}</p>
              )}
            </div>
          </div>
        ))}

        <div className="actions">
          <button type="button" onClick={handleAddStaff} className="add-btn">
            Agregar Docente
          </button>
        </div>
      </div>
    </form>
  );
};

export default StaffForm;
