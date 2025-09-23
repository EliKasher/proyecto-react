import React from "react";
import {
  faculties,
  educational_level,
  dates,
} from "../../../backend/data/faculties.ts";
import "../styles/course_form.css";
import { CourseData, CourseDate } from "../types/course.ts";

type Props = {
  data: CourseData;
  setData: React.Dispatch<React.SetStateAction<CourseData>>;
};

const CourseForm = ({ data, setData }: Props) => {
  const handleEducationalLevelChange = (checked: boolean, value: string) => {
    if (checked && !data.educational_level.includes(value)) {
      setData({
        ...data,
        educational_level: [...data.educational_level, value],
      });
    } else if (!checked) {
      setData({
        ...data,
        educational_level: data.educational_level.filter(
          (val) => val !== value
        ),
      });
    }
  };

  const handleQuotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuota = Number(event.target.value);

    if (newQuota < 25 || newQuota > 100) {
      newQuota = 25;
    }

    setData({ ...data, quota: newQuota });
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
      setData({ ...data, course_start: [...data.course_start, newDate] });
    } else {
      setData({
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
      });
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
            <label className="required">Nombre del Curso</label>
            <input
              id="course-name"
              type="text"
              placeholder="ej: Álgebra Universitaria"
              name="course-name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <p className="recommendations">
              Recuerda usar un nombre atractivo para las y los estudiantes
            </p>
          </div>
          <div className="form-row">
            <label className="required">
              Facultad en la que se impartirá el curso
            </label>
            <select
              name="faculty"
              value={data.faculty}
              onChange={(e) => setData({ ...data, faculty: e.target.value })}
              required
            >
              <option value="">Seleccione</option>
              {faculties.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="required">
              Niveles Educativos a los cuales va dirigido el curso
            </label>
            {educational_level.map((item, index) => (
              <label key={index}>
                <input
                  id={`course-level-${item}`}
                  type="checkbox"
                  name="levels"
                  checked={data.educational_level.includes(item)}
                  onChange={(e) =>
                    handleEducationalLevelChange(e.target.checked, item)
                  }
                />
                {item}°
              </label>
            ))}
          </div>
          <div className="form-row">
            <label className="required">Cupo Total pensado para el Curso</label>
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
          </div>
          <div className="form-row">
            <label className="required">Fecha Ideal de Implementación</label>
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
                      type="checkbox"
                      checked={isChecked}
                      name="course-start-dates"
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
