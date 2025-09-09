import { faculties, educational_level, dates } from '../../backend/data/faculties.ts';

const CourseForm = () => {
  return (
    <>
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
                    >
                    </input>
                    <label className="recommendations">Recuerda usar un nombre atractivo para las y los estudiantes</label>
                </div>
                <div className="form-row">
                    <label className="required">Facultad en la que se impartirá el curso</label>
                    <select name="faculty" required>
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
                            ></input>
                            {item}°
                        </label>  
                    ))}
                </div>
                <div className="form-row">
                    <label className="required">Cupo Total pensado para el Curso</label>
                    <input id="course-quota" name="course-quota" type="text"></input>
                    <label className="recommendations">Esta cantidad no puede ser menor a 25 estudiantes</label>
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
                                >
                                </input>
                                {dateText}
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default CourseForm;