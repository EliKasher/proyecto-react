import "../styles/course_form.css";

const DayContent = (props: { dayNumber: number }) => {
    const dayNumber: number = props.dayNumber;

    return (
        <div className="form-row">
            <h3> Dia {dayNumber}</h3>
            <div>
                <div className="row-flex">
                    <div>
                        <label className="required">Primer Bloque (09:00 a 10:30)</label>
                        <textarea name={"firstBlockDay" + dayNumber} cols={50} rows={5}>
                            {" "}
                        </textarea>
                    </div>
                    <div>
                        <label>Sala</label>
                        <input type="text" name={"firstBlockClassroomDay" + dayNumber} maxLength={10} size={10} placeholder="S19"></input>
                    </div>
                </div>
                <div className="row-flex">
                    <div>
                        <label className="required">Segundo Bloque (11:00 a 12:30)</label>
                        <textarea name={"secondBlockDay" + dayNumber} cols={50} rows={5}>
                            {" "}
                        </textarea>
                    </div>
                    <div>
                        <label>Sala</label>
                        <input type="text" name={"secondBlockClassroomDay" + dayNumber} maxLength={10} size={10} placeholder="S19"></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WeeklyProgramForm = () => {

    const dayNumbers: Array<number> = [1,2,3,4,5]

    return (
        <div className="form-section">
            <div className="section-header">
                <h3>Programación Semanal</h3>
            </div>
            {dayNumbers.map((dayNumber) => <DayContent dayNumber={dayNumber}></DayContent>)}
            
        </div>
    );
};

export default WeeklyProgramForm;
