import { type CourseDate } from "./course"

export interface FacultySchema {
    id: string | number,
    name: string
}

export interface EducationalLevelSchema {
    id: string | number,
    level: string
}

export interface CourseDateSchema extends CourseDate { id: string | number }

export interface EmploymentRelationshipSchema {
    id: string | number,
    relation: string,
    requirements: Array<string>
}

export interface DocumentsSchema {
    short_name: string
    full_name: string
    note?: string
}
