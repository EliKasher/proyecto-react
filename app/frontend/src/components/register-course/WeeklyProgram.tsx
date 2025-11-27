import { type DailyPlanification } from "../../types/course";
import { useDispatch } from "react-redux";
import { updateIsValid, updatePlanForDay } from "../../reducers/formReducer";

type Props = {
  data: DailyPlanification[];
  isValid: boolean;
  showErrors: boolean;
};

const WeeklyProgramForm = ({ data, isValid, showErrors }: Props) => {
  const dispatch = useDispatch();

  const handleChange = (
    field: keyof DailyPlanification,
    value: string | null,
    day: number
  ) => {
    dispatch(
      updatePlanForDay({
        day: day,
        plan: { ...data[day - 1], [field]: value },
      })
    );
  };

  const periodMax = 250;
  const periodMin = 100;
  const classroomMax = 30;
  const classroomMin = 3;

  const errors = Array.from({ length: 5 }, () => ({
    firstPeriodError: "",
    firstClassroomError: "",
    secondPeriodError: "",
    secondClassroomError: "",
  }));

  const validate = () => {
    let errorCount = 0;

    for (let i = 0; i < data.length; i++) {
      const day = data[i];

      if (day.first_period.length > periodMax) {
        errors[
          day.day - 1
        ].firstPeriodError = `La descripción no puede superar los ${periodMax} carácteres de largo.`;
        errorCount++;
      } else if (day.first_period.length < periodMin) {
        errors[
          day.day - 1
        ].firstPeriodError = `La descripción tiene que ser de al menos ${periodMin} carácteres de largo.`;
        errorCount++;
      } else {
        errors[day.day - 1].firstPeriodError = "";
      }

      if (day.first_classroom.length > classroomMax) {
        errors[
          day.day - 1
        ].firstClassroomError = `El nombre de sala no puede superar los ${classroomMax} carácteres.`;
        errorCount++;
      } else if (day.first_classroom.length < classroomMin) {
        errors[
          day.day - 1
        ].firstClassroomError = `El nombre de sala debe tener al menos ${classroomMin} carácteres.`;
        errorCount++;
      } else {
        errors[day.day - 1].firstClassroomError = "";
      }

      if (day.second_period.length > periodMax) {
        errors[
          day.day - 1
        ].secondPeriodError = `La descripción no puede superar los ${periodMax} carácteres de largo.`;
        errorCount++;
      } else if (day.second_period.length < periodMin) {
        errors[
          day.day - 1
        ].secondPeriodError = `La descripción tiene que ser de al menos ${periodMin} carácteres de largo.`;
        errorCount++;
      } else {
        errors[day.day - 1].secondPeriodError = "";
      }

      if (day.second_classroom.length > classroomMax) {
        errors[
          day.day - 1
        ].secondClassroomError = `El nombre de sala no puede superar los ${classroomMax} carácteres.`;
        errorCount++;
      } else if (day.second_classroom.length < classroomMin) {
        errors[
          day.day - 1
        ].secondClassroomError = `El nombre de sala debe tener al menos ${classroomMin} carácteres.`;
        errorCount++;
      } else {
        errors[day.day - 1].secondClassroomError = "";
      }
    }

    return errorCount === 0;
  };

  const status = validate();

  if (status != isValid) dispatch(updateIsValid(status));

  return (
    <div className="form-container">
      <div className="section-header">
        <h3>Programación Semanal</h3>
      </div>
      <div className="form-group">
        {data.map((day) => (
          <div className="form-row">
            <div className="card">
              <div className="section-header">
                <h2> Día {day.day}</h2>
              </div>
              <div className="row-flex">
                <div className="form-column">
                  <label className="required">
                    Primer Bloque (09:00 a 10:30)
                  </label>
                  <textarea
                    name={"firstBlockDay" + day.day}
                    cols={50}
                    rows={5}
                    maxLength={periodMax}
                    value={data[day.day - 1].first_period}
                    onChange={(e) =>
                      handleChange("first_period", e.target.value, day.day)
                    }
                  ></textarea>
                  <p style={{width: '100%', maxWidth: '450px'}} className="recommendations">
                    {data[day.day - 1].first_period.length}/{periodMax} El largo
                    mínimo es {periodMin}
                  </p>
                  {showErrors && errors[day.day - 1].firstPeriodError && (
                    <p style={{width: '100%', maxWidth: '450px'}} className="error-message">
                      {errors[day.day - 1].firstPeriodError}
                    </p>
                  )}
                </div>
                <div className="form-column" id="classroom-1">
                  <label>Sala</label>
                  <input
                    type="text"
                    name={"firstBlockClassroomDay" + day.day}
                    maxLength={classroomMax}
                    size={10}
                    placeholder="S19"
                    value={data[day.day - 1].first_classroom}
                    onChange={(e) =>
                      handleChange("first_classroom", e.target.value, day.day)
                    }
                  />
                  <p style={{width: '100%', maxWidth: '450px'}} className="recommendations">
                    {data[day.day - 1].first_classroom.length}/{classroomMax} El
                    largo mínimo es {classroomMin}
                  </p>
                  {showErrors && errors[day.day - 1].firstClassroomError && (
                    <p style={{width: '100%', maxWidth: '450px'}} className="error-message">
                      {errors[day.day - 1].firstClassroomError}
                    </p>
                  )}
                </div>
              </div>
              <div className="row-flex">
                <div className="form-column">
                  <label className="required">
                    Segundo Bloque (11:00 a 12:30)
                  </label>
                  <textarea
                    name={"secondBlockDay" + day.day}
                    cols={50}
                    rows={5}
                    maxLength={periodMax}
                    value={data[day.day - 1].second_period}
                    onChange={(e) =>
                      handleChange("second_period", e.target.value, day.day)
                    }
                  ></textarea>
                  <p style={{width: '100%', maxWidth: '450px'}} className="recommendations">
                    {data[day.day - 1].second_period.length}/{periodMax} El
                    largo mínimo es {periodMin}
                  </p>
                  {showErrors && errors[day.day - 1].secondPeriodError && (
                    <p style={{width: '100%', maxWidth: '450px'}} className="error-message">
                      {errors[day.day - 1].secondPeriodError}
                    </p>
                  )}
                </div>
                <div className="form-column" id="classroom-2">
                  <label>Sala</label>
                  <input
                    type="text"
                    name={"secondBlockClassroomDay" + day.day}
                    maxLength={classroomMax}
                    size={10}
                    placeholder="S19"
                    value={data[day.day - 1].second_classroom}
                    onChange={(e) =>
                      handleChange("second_classroom", e.target.value, day.day)
                    }
                  />
                  <p style={{width: '100%', maxWidth: '450px'}} className="recommendations">
                    {data[day.day - 1].second_classroom.length}/{classroomMax}{" "}
                    El largo mínimo es {classroomMin}
                  </p>
                  {showErrors && errors[day.day - 1].secondClassroomError && (
                    <p style={{width: '100%', maxWidth: '450px'}} className="error-message">
                      {errors[day.day - 1].secondClassroomError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgramForm;
