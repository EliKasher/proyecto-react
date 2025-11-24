import React from "react";
import {
  type FacultySchema,
  type EducationalLevelSchema,
  type CourseDateSchema,
} from "../../types/coursesSchema.ts";
import { type CourseData, type CourseDate } from "../../types/course.ts";
import { useDispatch } from "react-redux";
import { setCourseData, updateIsValid } from "../../reducers/formReducer.ts";

type Props = {
  data: CourseData;
  faculties: FacultySchema[];
  educationalLevels: EducationalLevelSchema[];
  dates: CourseDateSchema[];
  isValid: boolean;
  showErrors: boolean;
};

const CourseForm = ({
  faculties,
  educationalLevels,
  dates,
  data,
  isValid,
  showErrors,
}: Props) => {
  const dispatch = useDispatch();

  const handleEducationalLevelChange = (checked: boolean, value: string) => {
    if (checked && !data.educational_level.includes(value)) {
      dispatch(
        setCourseData({
          ...data,
          educational_level: [...data.educational_level, value],
        })
      );
    } else if (!checked) {
      dispatch(
        setCourseData({
          ...data,
          educational_level: data.educational_level.filter(
            (val) => val !== value
          ),
        })
      );
    }
  };

  const errors = {
    name: "",
    faculty: "",
    levels: "",
    quota: "",
    dates: "",
  };

  const validate: () => boolean = () => {
    let errs = 0;

    // Name validation
    if (data.name.length < 5 || data.name.length > 40) {
      errs++;
      errors.name = "El nombre debe tener entre 5 y 40 carácteres.";
    }

    // Check faculty is valid
    if (!faculties.map((f) => f.name).includes(data.faculty)) {
      errs++;
      errors.faculty = "Por favor seleccionar una facultad.";
    }

    const educationalLevelsNames = educationalLevels.map((e) => e.level);

    // At least one level
    if (data.educational_level.length === 0) {
      errs++;
      errors.levels = "Por favor seleccione al menos un nivel.";
    } else {
      const uniqueLevels = new Set(data.educational_level);

      // Check no dupes
      if (uniqueLevels.size !== data.educational_level.length) {
        errs++;
        errors.levels = "No puede seleccionar el mismo nivel dos veces.";
      }

      // Check all levels are valid
      for (let i = 0; i < data.educational_level.length; i++) {
        const lvl = data.educational_level[i];
        if (!educationalLevelsNames.includes(lvl)) {
          errs++;
          const errMsg = "Un nivel seleccionado no es una opción valida.";
          errors.levels =
            errors.levels === "" ? errMsg : errors.levels + "\\" + errMsg;
          break;
        }
      }
    }

    // Quota
    if (data.quota < 25) {
      errs++;
      errors.quota = "El mínimo cupo es 25, actual: " + data.quota;
    }

    // Fechas
    if (data.course_start.length === 0) {
      errs++;
      errors.dates = "Seleccione al menos una fecha.";
    } else {
      // Check duplicates via JSON.stringify
      const datesSet = new Set(data.course_start.map((d) => JSON.stringify(d)));
      if (datesSet.size !== data.course_start.length) {
        errs++;
        errors.dates =
          "No puede seleccionar la misma fecha de inicio mas de una vez.";
      }

      for (let i = 0; i < data.course_start.length; i++) {
        const start: Record<string, any> = data.course_start[i];

        const found = dates.some((date: Record<string, any>) =>
          Object.keys(start).every((key) => date[key] === start[key])
        );

        if (!found) {
          errs++;
          const errMsg = "Una fecha seleccionada no es una opción valida.";
          errors.dates =
            errors.dates === "" ? errMsg : errors.dates + "\\" + errMsg;
          break;
        }
      }
    }

    return errs === 0;
  };

  const status = validate();
  if (status !== isValid) {
    dispatch(updateIsValid(status));
  }

  const handleQuotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuota = Number(event.target.value);

    if (newQuota < 25 || newQuota > 100) {
      newQuota = 25;
    }

    dispatch(setCourseData({ ...data, quota: newQuota }));
  };

  const handleDateChange = (
    checked: boolean,
    startDate: string,
    endDate: string,
    startMonth: string,
    endMonth: string
  ) => {
    const newDate: CourseDate = {
      start_date: startDate,
      end_date: endDate,
      start_month: startMonth,
      end_month: endMonth,
    };

    if (checked) {
      dispatch(
        setCourseData({
          ...data,
          course_start: [...data.course_start, newDate],
        })
      );
    } else {
      dispatch(
        setCourseData({
          ...data,
          course_start: data.course_start.filter(
            (d) =>
              !(
                d.start_date === newDate.start_date &&
                d.end_date === newDate.end_date &&
                d.start_month === newDate.start_month &&
                d.end_month === newDate.end_month
              )
          ),
        })
      );
    }
  };

  return (
    <form className="form-container">
      <div className="form-section">
        <div className="section-header">
          <h3>Información del Curso</h3>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label htmlFor="course-name" className="required">Nombre del Curso</label>
            <input
              id="course-name"
              type="text"
              placeholder="ej: Álgebra Universitaria"
              name="course-name"
              value={data.name}
              maxLength={40}
              onChange={(e) =>
                dispatch(setCourseData({ ...data, name: e.target.value }))
              }
            />
            <p className="recommendations">
              Recuerda usar un nombre atractivo para las y los estudiantes
            </p>
            {showErrors && errors.name && (
              <p className="error-message">{errors.name}</p>
            )}
          </div>
          <div className="form-row">
            <label
              htmlFor="faculty"
              className="required"
            >
              Facultad en la que se impartirá el curso
            </label>
            <select
              id="faculty"
              name="faculty"
              value={data.faculty}
              onChange={(e) =>
                dispatch(setCourseData({ ...data, faculty: e.target.value }))
              }
              required
            >
              <option value="">Seleccione</option>
              {faculties.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {showErrors && errors.faculty && (
              <p className="error-message">{errors.faculty}</p>
            )}
          </div>
          <div className="form-row">
            <label
              className="required"
            >
              Niveles Educativos a los cuales va dirigido el curso
            </label>
            {educationalLevels.map((item, index) => (
              <label key={index}>
                <input
                  id={`course-level-${item}`}
                  name={`course-level-${item}`}
                  type="checkbox"
                  checked={data.educational_level.includes(item.level)}
                  onChange={(e) =>
                    handleEducationalLevelChange(e.target.checked, item.level)
                  }
                />
                {item.level}°
              </label>
            ))}
            {showErrors && errors.levels && (
              <p className="error-message">{errors.levels}</p>
            )}
          </div>
          <div className="form-row">
            <label
              htmlFor="course-quota"
              className="required"
            >
              Cupo Total pensado para el Curso
            </label>
            <input
              id="course-quota"
              name="course-quota"
              type="number"
              min={25}
              max={100}
              value={data.quota}
              onChange={handleQuotaChange}
            />
            <p className="recommendations">
              Esta cantidad no puede ser menor a 25 estudiantes
            </p>
            {showErrors && errors.quota && (
              <p className="error-message">{errors.quota}</p>
            )}
          </div>
          <div className="form-row">
            <label className="required">
              Fecha Ideal de Implementación
            </label>
            {dates.map(
              ({ start_date, start_month, end_date, end_month }, index) => {
                const dateText =
                  start_month === end_month
                    ? `${start_date} al ${end_date} de ${end_month}`
                    : `${start_date} de ${start_month} al ${end_date} de ${end_month}`;

                const isChecked = data.course_start.some(
                  (d) =>
                    d.start_date === start_date &&
                    d.end_date === end_date &&
                    d.start_month === start_month &&
                    d.end_month === end_month
                );

                return (
                  <label
                    key={index}
                    htmlFor={`course-start-date-${index}`}
                    className="date-label"
                  >
                    <input
                      id={`course-start-date-${index}`}
                      name={`course-start-date-${index}`}
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleDateChange(
                          e.target.checked,
                          start_date,
                          end_date,
                          start_month,
                          end_month
                        )
                      }
                    />
                    {dateText}
                  </label>
                );
              }
            )}
            {showErrors && errors.dates && (
              <p className="error-message">{errors.dates}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
