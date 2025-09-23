import React, { useState } from "react";
import "../styles/course_form.css"
import { Staff } from "../types/course";

const StaffForm = (props: {
    staff: Staff[],
    setStaff: (arg: Staff[]) => void;
}) => {
    const staff = props.staff;
    const setStaff = props.setStaff;

     const handleChangeStaff = (index: number, field: keyof Staff, value: string) => {
        const updatedStaff = staff.map((member, i) => {
            if (i === index) {
                return {
                    ...member,
                    [field]: value
                };
            }
            return member;
        });
        setStaff(updatedStaff);
    };

    const handleAddStaff = () => {
        setStaff([...staff, {
            first_name: "",
            last_name: "",
            rut: "",
            email: "",
            phone: "",
            position: "",
        }])
    };

    const handleRemoveStaff = (index: number) => {
        if (staff.length <= 1) {
            return;
        }
        setStaff(staff.filter((_, i) => i !== index));
    };

  return (
    <form className="form-container">
        <div className="form-section">
            <div className="section-header">
                <h3>Equipo Docente del Curso</h3>
                <p className="recommendations">Estos datos se utilizarán para la gestión del curso y el procesamiento de pagos. En el caso de los miembros que reciban pagos por beca laboral o convenio, será responsabilidad del equipo docente completar los formularios correspondientes con sus documentos, a fin de no retrasar dichos pagos.</p>
            </div>
            {staff.map((data, index) => (
                <div key={index} className="card">
                    <div className="card-section-header">
                        <h2>Docente {index + 1}</h2>
                        {staff.length > 1 && (
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
                                onChange={(e) => handleChangeStaff(index, "first_name", e.target.value)}
                                value={data.first_name}
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
                                onChange={(e) => handleChangeStaff(index, "last_name", e.target.value)}
                                value={data.last_name}
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
                            onChange={(e) => handleChangeStaff(index, "rut", e.target.value)}
                            value={data.rut}
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
                            onChange={(e) => handleChangeStaff(index, "email", e.target.value)}
                            value={data.email}
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
                            onChange={(e) => handleChangeStaff(index, "phone", e.target.value)}
                            value={data.phone}
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
            </div>
        </div>
    </form>
  );
}

export default StaffForm;