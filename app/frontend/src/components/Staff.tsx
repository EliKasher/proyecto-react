import React from "react";
import "../styles/course_form.module.css";
import { type Staff } from "../types/course";

type Props = {
  data: Staff[];
  setData: React.Dispatch<React.SetStateAction<Staff[]>>;
};

const StaffForm = ({ data, setData }: Props) => {
  const handleChangeStaff = (index: number, field: keyof Staff, value: string) => {
    const updatedStaff = data.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setData(updatedStaff);
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
                <label className="required">Nombres</label>
                <input
                  type="text"
                  value={member.first_name}
                  onChange={(e) =>
                    handleChangeStaff(index, "first_name", e.target.value)
                  }
                  required
                />
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
