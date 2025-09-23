import React, { useState } from 'react';
import { faculties, educational_level, dates } from '../../../backend/data/faculties.ts';
import "../styles/course_form.css"

type Course = {
    courseName: string,
    faculty: string,
    levels: string[],
    courseQuota: number,
    courseDates: string[],
}

const CourseForm = () => {
    const [courseData, setCourseData] = useState<Course>({
        courseName: "",
        faculty: "",
        levels: [],
        courseQuota: 25,
        courseDates: [],
    });

    // Para inputs, guarda el estado al cambiar
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setCourseData(prevCourseData => ({
            ...prevCourseData,
            [name]: value
        }));
    }

    // Para checkbox, guarda el estado al cambiar
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setCourseData(prevCourseData => {
            const currentLevels = prevCourseData.levels || [];

            if (checked) {
                return {
                    ...prevCourseData,
                    levels: [...currentLevels, value]
                };
            } else {
                return {
                    ...prevCourseData,
                    levels: currentLevels.filter(level => level !== value)
                };
            }
        })
    }

    const handleDateCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setCourseData(prevCourseData => {
            const currentDates = prevCourseData.courseDates || [];

            if (checked) {
                return {
                    ...prevCourseData,
                    courseDates: [...currentDates, value]
                };
            } else {
                return {
                    ...prevCourseData,
                    courseDates: currentDates.filter(date => date !== value)
                }
            }

        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Chequeo de inputs", courseData);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
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
                                name="courseName"
                                onChange={handleInputChange}
                                value={courseData?.courseName}
                            >
                            </input>
                            <p className="recommendations">Recuerda usar un nombre atractivo para las y los estudiantes</p>
                        </div>
                        <div className="form-row">
                            <label className="required">Facultad en la que se impartirá el curso</label>
                            <select 
                                name="faculty" 
                                value={courseData.faculty}
                                onChange={handleInputChange}
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
                                        value={item}
                                        onChange={handleCheckboxChange}
                                        checked={courseData.levels?.includes(item) || false}
                                    ></input>
                                    {item}°
                                </label>
                            ))}
                        </div>
                        <div className="form-row">
                            <label className="required">Cupo Total pensado para el Curso</label>
                            <input 
                                id="course-quota" 
                                name="courseQuota" 
                                type="number"
                                value={courseData?.courseQuota}
                                onChange={handleInputChange}
                            >
                            </input>
                            <p className="recommendations">Esta cantidad no puede ser menor a 25 estudiantes</p>
                        </div>
                        <div className="form-row">
                            <label className="required">Fecha Ideal de Implementación</label>
                            {dates.map(({start_date, start_month, end_date, end_month}, index) => {
                                const dateText = start_month === end_month
                                        ? `${start_date} al ${end_date} de ${end_month}`
                                        : `${start_date} de ${start_month} al ${end_date} de ${end_month}`;

                                const dateValue = `${start_date} - ${start_month} to ${end_date} - ${end_month}`

                                return (
                                    <label
                                        key={index}
                                        htmlFor={`course-start-date-${index}`}
                                        className="date-label"
                                    >
                                        <input
                                            id={`course-start-date-${index}`}
                                            type="checkbox"
                                            name="courseDates"
                                            onChange={handleDateCheckbox}
                                            value={dateValue}
                                            checked={courseData.courseDates.includes(dateValue) || false}
                                        >
                                        </input>
                                        {dateText}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="actions">
                        <button type="submit" className="submit-btn">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CourseForm;