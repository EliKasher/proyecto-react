import React, { useState } from "react";
import "../styles/course_form.css";

const ProgramContentForm = (props: {
    coursePurpose: string,
    objectives: string[],
    setCoursePurpose: (arg: string) => void;
    setObjectives: (arg: string[]) => void;
}) => {

    const coursePurpose = props.coursePurpose;
    const objectives = props.objectives;
    const setCoursePurpose = props.setCoursePurpose;
    const setObjectives = props.setObjectives;

    // Para inputs, guarda el estado al cambiar
    const handleCoursePurpose = (coursePurpose: string) => setCoursePurpose(coursePurpose);

    const handleChangeObjective = (
        value: string
    ) => {
        const nuevos = [...objectives, value];
        
        setObjectives(nuevos);
    };

    const handleAddObjective = () => {
        setObjectives([...objectives, ""])
    };

    const handleRemoveObjective = (index: number) => {
        const nuevos = objectives.filter((_, i) => i !== index);
        setObjectives(nuevos);
    };

    return (
        <form className="form-container">
            <div className="form-section">
                <div className="section-header">
                    <h3>Contenido del Programa</h3>
                    <p className="recommendations">Recuerda que los datos que ingreses serán tu carta de presentación para los y las estudiantes</p>
                </div>
                <div className="form-row">
                    <label className="required">¿Qué aprenderemos en este curso?</label>
                    <input
                        id="course-purpose"
                        type="text"
                        name="coursePurpose"
                        value={coursePurpose}
                        onChange={(e) => handleCoursePurpose(e.target.value)}
                        required
                    >
                    </input>
                </div>
                {objectives.map((objective, index) => (
                    <div key={index} className="card">
                        <div className="card-section-header">
                            <h2>Objetivo {index + 1}</h2>
                            {objectives.length > 0 && (
                                <span
                                    onClick={() => handleRemoveObjective(index)}
                                    className="cancel-btn"
                                >
                                    <img src="close.svg" alt="Eliminar Objetivo" />
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <input
                                    name="objective"
                                    type="text"
                                    value={objective}
                                    onChange={(e) => handleChangeObjective(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="actions">
                    <button type="button" onClick={handleAddObjective} className="add-btn">
                        Agregar Objetivo
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProgramContentForm;