import { faculties } from '../../backend/data/faculties.ts';

function CourseForm() {
  return (
    <>
      <div className="course-register">
        <div className="register-header">
          <h1>Formulario Inscripción EdV Verano 2026</h1>
          <h4>Este formulario pretende optimizar y sistematizar los programas e información asociadas a los cursos EdV.</h4>
          <h4 className="register-precaution">
            Recuerda que todos los campos marcados con
            <span className="required"></span> son obligatorios.
            </h4>
        </div>
        <div className="course-form-container">
          <form className="course-form">
            <div className="form-section">
              <div className="section-header">
                <h3>Información del Curso</h3>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <label className="required">Nombre del Curso</label>
                  <input id="course-name" type="text" placeholder="ej: Álgebra Universitaria"></input>
                  <label className="recommendations">Recuerda usar un nombre atractivo para las y los estudiantes</label>
                </div>
                <div className="form-row">
                  <label className="required">Facultad en la que se impartirá el curso</label>
                  <select required>
                    <option value="">Seleccione</option>
                    {faculties.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  
                </div>
                <div className="form-row">
                  <label className="required">Cupo Total pensado para el Curso</label>
                  <input id="course-quota" type="text"></input>
                  <label className="recommendations">Esta cantidad no puede ser menor a 25 estudiantes</label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}