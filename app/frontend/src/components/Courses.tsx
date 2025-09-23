import React, { useState } from "react";
import {
    faculties,
    educational_level,
    dates,
} from "../../../backend/data/faculties.ts";
import "../styles/course_form.css";
import { CourseDate } from "../types/course.ts";

const CourseForm = (props: {
    setName: (arg: string) => void;
    setFaculty: (arg: string) => void;
    educationalLevels: string[];
    setEducationalLevel: (arg: string[]) => void;
    setQuota: (arg: number) => void;
    courseDate: CourseDate[];
    setDate: (arg: CourseDate[]) => void;
}) => {

    const handleNameChange = (name: string) => props.setName(name);
    const handleFacultyChange = (faculty: string) => props.setFaculty(faculty);

    const handleEducationalLevelChange = (checked: boolean, value: string) => {
        if (checked && !(value in props.educationalLevels)) {
            props.setEducationalLevel(props.educationalLevels.concat([value]));
        } else if (!checked && value in props.educationalLevels) {
            props.setEducationalLevel(
                props.educationalLevels.filter((val) => val !== value)
            );
        }
    };

    const handleQuotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newQuota = Number(event.target.value);

        if (newQuota < 25 || newQuota > 100) {
            newQuota = 25;
        }

        props.setQuota(newQuota);
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

        if (checked && !(props.courseDate.filter((val) => val !== newDate))) {
            props.setDate(props.courseDate.concat([newDate]));
        } else if (!checked && (props.courseDate.filter((val) => val !== newDate))) {
            props.setDate(props.courseDate.filter((val) => val !== newDate));
        }
    };
  return (
    <>
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
                        onChange={(e) => handleNameChange(e.target.value)}
                    >
                    </input>
                    <p className="recommendations">Recuerda usar un nombre atractivo para las y los estudiantes</p>
                </div>
                <div className="form-row">
                    <label className="required">Facultad en la que se impartirá el curso</label>
                    <select
                        name="faculty"
                        onChange={(e) => handleFacultyChange(e.target.value)}
                        required
                    >
                        <option value="">Seleccione</option>
                        {faculties.map((item, index) => (
                            <option
                                key={index}
                                value={item}
                            >
                                {item}
                            </option>
                    ))}
                    </select>
                </div>
                <div className="form-row">
                    <label className="required">Niveles Educativos a los cuales va dirigido el curso</label>
                    {educational_level.map((item, index) => (
                        <label key={index}>
                            <input
                                id={`course-level-${item}`}
                                type="checkbox"
                                name="levels"
                                onChange={(e) =>
                                        handleEducationalLevelChange(e.target.checked, item)
                                    }
                            ></input>
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
                        onChange={(e) => handleQuotaChange(e)}
                    ></input>
                    <p className="recommendations">Esta cantidad no puede ser menor a 25 estudiantes</p>
                </div>
                <div className="form-row">
                    <label className="required">Fecha Ideal de Implementación</label>
                    {dates.map(({start_date, start_month, end_date, end_month}, index) => {
                        const dateText = start_month === end_month
                                ? `${start_date} al ${end_date} de ${end_month}`
                                : `${start_date} de ${start_month} al ${end_date} de ${end_month}`;

                        return (
                            <label
                                key={index}
                                htmlFor={`course-start-date-${index}`}
                                className="date-label"
                            >
                                <input
                                    id={`course-start-date-${index}`}
                                    type="checkbox"
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
                                >
                            </input>
                                {dateText}
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
     </form>
    </>
  )
}

export default CourseForm;
