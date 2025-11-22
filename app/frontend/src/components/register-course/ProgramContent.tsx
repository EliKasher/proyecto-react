import { useDispatch } from "react-redux";
import { setProgramContent } from "../../reducers/formReducer";

import { type ProgramContent } from "../../types/course";

type Props = {
  data: ProgramContent;
};

const ProgramContentForm = ({ data }: Props) => {
  const dispatch = useDispatch();

  const handleCoursePurposeChange = (value: string) => {
    dispatch(setProgramContent({ ...data, course_purpose: value }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...data.learning_objectives];
    newObjectives[index] = value;
    dispatch(
      setProgramContent({ ...data, learning_objectives: newObjectives })
    );
  };

  const handleAddObjective = () => {
    dispatch(
      setProgramContent({
        ...data,
        learning_objectives: [...data.learning_objectives, ""],
      })
    );
  };

  const handleRemoveObjective = (index: number) => {
    const newObjectives = data.learning_objectives.filter(
      (_, i) => i !== index
    );
    dispatch(
      setProgramContent({ ...data, learning_objectives: newObjectives })
    );
  };

  return (
    <form className="form-container">
      <div className="form-section">
        <div className="section-header">
          <h3>Contenido del Programa</h3>
          <p className="recommendations">
            Recuerda que los datos que ingreses serán tu carta de presentación
            para los y las estudiantes
          </p>
        </div>

        <div className="form-row">
          <label className="required">¿Qué aprenderemos en este curso?</label>
          <input
            id="course-purpose"
            type="text"
            name="coursePurpose"
            value={data.course_purpose}
            onChange={(e) => handleCoursePurposeChange(e.target.value)}
            required
          />
        </div>

        {data.learning_objectives.map((objective, index) => (
          <div key={index} className="card">
            <div className="card-section-header">
              <h2>Objetivo {index + 1}</h2>
              {data.learning_objectives.length > 0 && (
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
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="actions">
          <button
            type="button"
            onClick={handleAddObjective}
            className="add-btn"
          >
            Agregar Objetivo
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProgramContentForm;
