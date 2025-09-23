import { useEffect, useState } from "react";
import "../styles/course_form.css";
import { DailyPlanification } from "../types/course";

const DayContent = (props: {
    dayNumber: number;
    weeklyPlanification: DailyPlanification[];
    setWeeklyPlanification: (arg: DailyPlanification[]) => void;
}) => {
    const dayNumber: number = props.dayNumber;

    const handleFirstBlockDayChange = (plan: string) => {
        props.setWeeklyPlanification(
            props.weeklyPlanification.map((dayPlan) => {
                if (dayPlan.day === props.dayNumber) {
                    return { ...dayPlan, first_period: plan };
                }

                return dayPlan;
            })
        );
    };

    const handleFirstBlockClassroomChange = (classroom: string) => {
        props.setWeeklyPlanification(
            props.weeklyPlanification.map((dayPlan) => {
                if (dayPlan.day === props.dayNumber) {
                    return { ...dayPlan, first_classroom: classroom };
                }

                return dayPlan;
            })
        );
    };

    const handleSecondBlockDayChange = (plan: string) => {
        props.setWeeklyPlanification(
            props.weeklyPlanification.map((dayPlan) => {
                if (dayPlan.day === props.dayNumber) {
                    return { ...dayPlan, second_period: plan };
                }

                return dayPlan;
            })
        );
    };

    const handleSecondBlockClassroomChange = (classroom: string) => {
        props.setWeeklyPlanification(
            props.weeklyPlanification.map((dayPlan) => {
                if (dayPlan.day === props.dayNumber) {
                    return { ...dayPlan, second_classroom: classroom };
                }

                return dayPlan;
            })
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
                            onChange={(e) => handleFirstBlockDayChange(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className="form-column" id="classroom-1">
                        <label>Sala</label>
                        <input
                            type="text"
                            name={"firstBlockClassroomDay" + dayNumber}
                            maxLength={10}
                            size={10}
                            placeholder="S19"
                            onChange={(e) => handleFirstBlockClassroomChange(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="row-flex">
                    <div className="form-column">
                        <label className="required">Segundo Bloque (11:00 a 12:30)</label>
                        <textarea
                            name={"secondBlockDay" + dayNumber}
                            cols={50}
                            rows={5}
                            onChange={(e) => handleSecondBlockDayChange(e.target.value)}
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
                            onChange={(e) => handleSecondBlockClassroomChange(e.target.value)}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WeeklyProgramForm = (props: {
    weeklyPlanification: DailyPlanification[];
    setWeeklyPlanification: (args: DailyPlanification[]) => void;
}) => {
    const dayNumbers: Array<number> = [1, 2, 3, 4, 5];

    useEffect(() => {
        props.setWeeklyPlanification(
            dayNumbers.map((dayNumber: number) => {
                return {
                    day: dayNumber,
                    first_period: "",
                    first_classroom: null,
                    second_period: "",
                    second_classroom: null,
                };
            })
        );
    }, []);

    return (
        <div className="form-section">
            <div className="section-header">
                <h3>Programación Semanal</h3>
            </div>
            <div className="form-group">
                {dayNumbers.map((dayNumber) => <DayContent dayNumber={dayNumber}></DayContent>)}
            </div>
        </div>
    );
};

export default WeeklyProgramForm;
