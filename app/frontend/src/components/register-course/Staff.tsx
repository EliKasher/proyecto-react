import React from "react";
import { type Staff } from "../../types/course";

type Props = {
  data: Staff[];
  setData: React.Dispatch<React.SetStateAction<Staff[]>>;
};

function validateRut(rut: string): Boolean {
  const cleanRut = rut.toLowerCase().replace(/[^0-9k-]/g, '');

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

  const expected =
    check === 11 ? "0" : check === 10 ? "k" : String(check);

  return lastDigit === expected;
}

const StaffForm = ({ data, setData }: Props) => {
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  
  const handleChangeStaff = (index: number, field: keyof Staff, value: string) => {
    const updatedStaff = data.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setData(updatedStaff);
      
    const errorKey = `${index}-${field}`;
    const error = validateField(field, value);

    setErrors(prev => ({
      ...prev,
      [errorKey]: error
    }));
  };

  const handleAddStaff = () => {
    setData([
      ...data,
      {
        first_name: "",
        last_name: "",
        rut: "",
        email: "",
        phone: "",
        position: "",
      },
    ]);
  };

  const handleRemoveStaff = (index: number) => {
    if (data.length <= 0) return;
    setData(data.filter((_, i) => i !== index));
  };

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'email':
        if (!value) return 'El email es requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
        return '';
      
      case 'rut':
        if (!value) return 'El RUT es requerido';
        if (!/^[0-9]{7,8}-[0-9kK]{1}$/.test(value)) return 'Formato: 12345678-K';
        if (!validateRut(value)) return 'RUT inválido';
        return '';

      case 'phone':
        if (!value) return 'El teléfono es requerido';
        if (!/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/.test(value)) return 'Formato: (+56) 912345678';
        return '';
      
        default:
          return '';
    }
  }

  return (
    <form className="form-container">
      <div className="form-section">
        <div className="section-header">
          <h3>Equipo Docente del Curso</h3>
          <p className="recommendations">
            Estos datos se utilizarán para la gestión del curso y el procesamiento
            de pagos. En el caso de los miembros que reciban pagos por beca
            laboral o convenio, será responsabilidad del equipo docente completar
            los formularios correspondientes con sus documentos, a fin de no
            retrasar dichos pagos.
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
                <label htmlFor={`first-name-${index}`} className="required">Nombres</label>
                <input
                  id={`first-name-${index}`}
                  name={`first-name-${index}`}
                  type="text"
                  value={member.first_name}
                  onChange={(e) =>
                    handleChangeStaff(index, "first_name", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-column">
                <label htmlFor={`last-name-${index}`} className="required">Apellidos</label>
                <input
                  id={`last-name-${index}`}
                  name={`last-name-${index}`}
                  type="text"
                  value={member.last_name}
                  onChange={(e) =>
                    handleChangeStaff(index, "last_name", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor={`rut-${index}`} className="required">RUT</label>
              <input
                id={`rut-${index}`}
                name={`rut-${index}`}
                type="text"
                value={member.rut}
                placeholder="12345678-9"
                onChange={(e) =>
                  handleChangeStaff(index, "rut", e.target.value)
                }
                required
                className={errors[`${index}-rut`] ? 'error' : ''}
              />
              {errors[`${index}-rut`] && (
                <span className="error-message">{errors[`${index}-rut`]}</span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor={`email-${index}`} className="required">Correo Electrónico</label>
              <input
                id={`email-${index}`}
                name={`email-${index}`}
                type="email"
                value={member.email}
                onChange={(e) =>
                  handleChangeStaff(index, "email", e.target.value)
                }
                required
                className={errors[`${index}-email`] ? 'error' : ''}
              />
              {errors[`${index}-email`] && (
                <span className="error-message">{errors[`${index}-email`]}</span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor={`phone-${index}`} className="required">Teléfono</label>
              <input
                id={`phone-${index}`}
                name={`phone-${index}`}
                type="tel"
                value={member.phone}
                placeholder="+56912345678"
                onChange={(e) =>
                  handleChangeStaff(index, "phone", e.target.value)
                }
                required
                className={errors[`${index}-phone`] ? 'error' : ''}
              />
              {errors[`${index}-phone`] && (
                <span className="error-message">{errors[`${index}-phone`]}</span>
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
