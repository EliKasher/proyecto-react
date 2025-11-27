import { useDispatch } from "react-redux";
import { setProgramContent, updateIsValid } from "../../reducers/formReducer";

import { type ProgramContent } from "../../types/course";

type Props = {
  data: ProgramContent;
  showErrors: boolean;
  isValid: boolean;
};

const ProgramContentForm = ({ data, showErrors, isValid }: Props) => {
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

  const errors: {
    purpose: string;
    zeroObjectives: string;
    objectives: string[];
  } = {
    purpose: "",
    objectives: new Array(data.learning_objectives.length).fill(""),
    zeroObjectives: "Debe haber como mínimo un objetivo.",
  };

  const validate = () => {
    let errorCount = 0;

    if (data.course_purpose.length < 250) {
      errors.purpose =
        "El aprendizaje del curso debe tener al menos 250 caracteres";
      errorCount++;
    } else if (data.course_purpose.length > 500) {
      errors.purpose =
        "El aprendizaje del curso no debe superar los 500 caracteres";
      errorCount++;
    }

    if (data.learning_objectives.length === 0) {
      errorCount++;
    } else {
      for (let i = 0; i < data.learning_objectives.length; i++) {
        const obj = data.learning_objectives[i];
        if (obj.length < 100) {
          errorCount++;
          errors.objectives[i] =
            "La descripción del objetivo debe tener al menos 100 caracteres";
        } else if (obj.length > 250) {
          errorCount++;
          errors.objectives[i] =
            "La descripción del objetivo no debe superar los 250 caracteres";
        }
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
          <h3>Contenido del Programa</h3>
          <p className="recommendations">
            Recuerda que los datos que ingreses serán tu carta de presentación
            para los y las estudiantes
          </p>
        </div>

        <div className="form-row">
          <label className="required">¿Qué aprenderemos en este curso?</label>
          <textarea
            id="course-purpose"
            //type="text"
            cols={100}
            rows={5}
            maxLength={500}
            name="coursePurpose"
            value={data.course_purpose}
            onChange={(e) => handleCoursePurposeChange(e.target.value)}
            required
          />
          <p className="recommendations"> {data.course_purpose.length}/500 Mínimo 250 carácteres</p>
          {showErrors && errors.purpose && (
            <p className="error-message">{errors.purpose}</p>
          )}
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
                <textarea
                  name="objective"
                  maxLength={250}
                  rows={3}
                  cols={100}
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                />
                <p className="recommendations"> {objective.length}/250 Mínimo 100 carácteres</p>
                {showErrors && errors.objectives[index] && (
                  <p className="error-message">{errors.objectives[index]}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {data.learning_objectives.length === 0 && showErrors && (
          <p className="error-message">{errors.zeroObjectives}</p>
        )}

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
