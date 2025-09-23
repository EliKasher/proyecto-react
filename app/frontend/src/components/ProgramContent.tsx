import React, { useState } from "react";
import "../styles/course_form.css"

type ProgramContent = {
    coursePurpose: string;
    objectives: string[];
};

const ProgramContentForm = () => {
    const [programData, setProgramData] = useState<ProgramContent>({
        coursePurpose: "",
        objectives: []
    });

    // Para inputs, guarda el estado al cambiar
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setProgramData(prevProgramData => ({
            ...prevProgramData,
            [name]: value
        }));
    }
    
    const handleChangeObjective = (
        index: number,
        value: string
    ) => {
        setProgramData(prevProgramData => {
            const newObjective = [...prevProgramData.objectives];
            newObjective[index] = value;

            return {
                ...prevProgramData,
                objectives: newObjective
            }
        });
    };

    const handleAddObjective = () => {
        setProgramData(prevProgramData => ({
            ...prevProgramData,
            objectives: [...prevProgramData.objectives, ""]
        }));
    };

    const handleRemoveObjective = (index: number) => {
        if (programData.objectives.length <= 0) {
            return;
        }

        setProgramData(prevProgramData => ({
            ...prevProgramData,
            objectives: prevProgramData.objectives.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Materiales:", programData);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
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
                        onChange={handleInputChange}
                        value={programData?.coursePurpose}
                        required
                    >
                    </input>
                </div>
                {programData.objectives.map((data, index) => (
                    <div key={index} className="card">
                        <div className="card-section-header">
                            <h2>Objetivo {index + 1}</h2>
                            {programData.objectives.length > 0 && (
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
                                    value={data}
                                    onChange={(e) => handleChangeObjective(index, e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="actions">
                    <button type="button" onClick={handleAddObjective} className="add-btn">
                        Agregar Objetivo
                    </button>
                    <button type="submit" className="submit-btn">
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProgramContentForm;