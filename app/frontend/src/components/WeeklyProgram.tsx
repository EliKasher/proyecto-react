import { useEffect } from "react";
import { type DailyPlanification } from "../types/course";

type Props = {
  data: DailyPlanification[];
  setData: React.Dispatch<React.SetStateAction<DailyPlanification[]>>;
};

const DayContent = ({
  dayNumber,
  data,
  setData,
}: {
  dayNumber: number;
  data: DailyPlanification[];
  setData: React.Dispatch<React.SetStateAction<DailyPlanification[]>>;
}) => {
  const handleChange = (field: keyof DailyPlanification, value: string | null) => {
    setData(
      data.map((dayPlan) =>
        dayPlan.day === dayNumber ? { ...dayPlan, [field]: value } : dayPlan
      )
    );
  };

  return (
    <div className="form-row">
      <div className="card">
        <div className="section-header">
          <h2> Día {dayNumber}</h2>
        </div>
        <div className="row-flex">
          <div className="form-column">
            <label className="required">Primer Bloque (09:00 a 10:30)</label>
            <textarea
              name={"firstBlockDay" + dayNumber}
              cols={50}
              rows={5}
              onChange={(e) => handleChange("first_period", e.target.value)}
            ></textarea>
          </div>
          <div className="form-column" id="classroom-1">
            <label>Sala</label>
            <input
              type="text"
              name={"firstBlockClassroomDay" + dayNumber}
              maxLength={10}
              size={10}
              placeholder="S19"
              onChange={(e) => handleChange("first_classroom", e.target.value)}
            />
          </div>
        </div>
        <div className="row-flex">
          <div className="form-column">
            <label className="required">Segundo Bloque (11:00 a 12:30)</label>
            <textarea
              name={"secondBlockDay" + dayNumber}
              cols={50}
              rows={5}
              onChange={(e) => handleChange("second_period", e.target.value)}
            ></textarea>
          </div>
          <div className="form-column" id="classroom-2">
            <label>Sala</label>
            <input
              type="text"
              name={"secondBlockClassroomDay" + dayNumber}
              maxLength={10}
              size={10}
              placeholder="S19"
              onChange={(e) => handleChange("second_classroom", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WeeklyProgramForm = ({ data, setData }: Props) => {
  const dayNumbers = [1, 2, 3, 4, 5];

  useEffect(() => {
  if (data.length === 0) {
    setData(
      dayNumbers.map((dayNumber) => ({
        day: dayNumber,
        first_period: "",
        first_classroom: null,
        second_period: "",
        second_classroom: null,
      }))
    );
  }
},);


  return (
    <div className="form-container">
      <div className="section-header">
        <h3>Programación Semanal</h3>
      </div>
      <div className="form-group">
        {dayNumbers.map((dayNumber) => (
          <DayContent
            key={dayNumber}
            dayNumber={dayNumber}
            data={data}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgramForm;
