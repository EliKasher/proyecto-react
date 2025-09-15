import type { CourseDate } from "../../frontend/src/types/course";

const faculties: string[] = [
    "Facultad de Ciencias Físicas y Matemáticas",
    "Facultad de Medicina",
    "Facultad de Economía y Negocios",
    "Facultad de Derecho",
    "Facultad de Ciencias Químicas y Farmacéuticas",
    "Facultad de Odontología",
    "Facultad de Gobierno",
    "Facultad de Ciencias Sociales",
    "Facultad de Filosofía y Humanidades",
    "Facultad de Ciencias Veterinarias y Pecuarias",
    "Facultad de Ciencias Forestales y de la Conservación de la Naturaleza"
]

const educational_level: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "I",
    "II",
    "III",
    "IV"
]

const dates: CourseDate[] = [
    {
        "start_date" : "5",
        "end_date" : "9",
        "start_month" : "enero",
        "end_month" : "enero"
    },
    {
        "start_date" : "12",
        "end_date" : "16",
        "start_month" : "enero",
        "end_month" : "enero"
    },
    {
        "start_date" : "19",
        "end_date" : "23",
        "start_month" : "enero",
        "end_month" : "enero"
    }
]

export {educational_level, faculties, dates};