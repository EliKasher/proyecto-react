import React, { useState } from "react";
import "../styles/course_form.css"

type StaffMember = {
    staffFirstName: string;
    staffLastName: string;
    staffRut: string;
    staffEmail: string;
    staffPhone: string;
    staffPosition: string;
};

const StaffForm = () => {
    const [staffData, setStaffData] = useState<StaffMember[]>([{
        staffFirstName: "",
        staffLastName: "",
        staffRut: "",
        staffEmail: "",
        staffPhone: "",
        staffPosition: ""
    }]);

    // Para inputs, guarda el estado al cambiar
    const handleInputChange = (
        index: number,
        field: keyof StaffMember,
        value: string
    ) => {
        setStaffData(prevStaffData => {
            const newStaffData = [...prevStaffData];
            newStaffData[index] = {
                ...newStaffData[index],
                [field]: value
            };
            return newStaffData;
        });
    };

    const handleAddStaff = () => {
        setStaffData(prevStaffData => [
            ...prevStaffData,
            {
                staffFirstName: "",
                staffLastName: "",
                staffRut: "",
                staffEmail: "",
                staffPhone: "",
                staffPosition: ""
            }
        ]);
    };

    const handleRemoveStaff = (index: number) => {
        if (staffData.length <= 1) {
            return;
        }

        setStaffData(prevStaffData => prevStaffData.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Staff:", staffData);
    };

  return (
    <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
            <div className="section-header">
                <h3>Equipo Docente del Curso</h3>
                <p className="recommendations">Estos datos se utilizarán para la gestión del curso y el procesamiento de pagos. En el caso de los miembros que reciban pagos por beca laboral o convenio, será responsabilidad del equipo docente completar los formularios correspondientes con sus documentos, a fin de no retrasar dichos pagos.</p>
            </div>
            {staffData.map((data, index) => (
                <div key={index} className="card">
                    <div className="card-section-header">
                        <h2>Docente {index + 1}</h2>
                        {staffData.length > 1 && (
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
                            <label className="required">Nombres </label>
                            <input
                                id="staff-name"
                                type="text"
                                name="staffFirstName"
                                onChange={(e) => handleInputChange(index, "staffFirstName", e.target.value)}
                                value={data.staffFirstName}
                                required
                            >
                            </input>
                        </div>
                        <div className="form-column">
                            <label className="required">Apellidos </label>
                            <input
                                id="staff-last-name"
                                type="text"
                                name="staffLastName"
                                onChange={(e) => handleInputChange(index, "staffLastName", e.target.value)}
                                value={data.staffLastName}
                                required
                            >
                            </input>
                        </div>
                    </div>
                    <div className="form-row">
                        <label className="required">RUT </label>
                        <input
                            id="staff-rut"
                            type="text"
                            name="staffRut"
                            onChange={(e) => handleInputChange(index, "staffRut", e.target.value)}
                            value={data.staffRut}
                            placeholder="12345678-9"
                            required
                        >
                        </input>
                    </div>
                    <div className="form-row">
                        <label className="required">Correo Electrónico </label>
                        <input
                            id="staff-email"
                            type="email"
                            name="staffEmail"
                            onChange={(e) => handleInputChange(index, "staffEmail", e.target.value)}
                            value={data.staffEmail}
                            required
                        >
                        </input>
                    </div>
                    <div className="form-row">
                        <label className="required">Teléfono </label>
                        <input
                            id="staff-phone"
                            type="tel"
                            name="staffPhone"
                            onChange={(e) => handleInputChange(index, "staffPhone", e.target.value)}
                            value={data.staffPhone}
                            placeholder="+56912345678"
                            required
                        >
                        </input>
                    </div>
                </div>
            ))}

            <div className="actions">
                <button type="button" onClick={handleAddStaff} className="add-btn">
                    Agregar Docente
                </button>
                <button type="submit" className="submit-btn">
                    Guardar
                </button>
            </div>
        </div>
    </form>
  );
}

export default StaffForm;