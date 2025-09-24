import { type CourseDate } from "./course"

export interface FacultySchema  {
    id: string | number,
    nombre: string
}

export interface EducationalLevelSchema { 
    id: string | number,
    nivel: string
}

export interface CourseDateSchema extends CourseDate {id: string | number}

export interface EmploymentRelationshipSchema {
    id: string | number,
    relacion: string
}

export interface RequiredDocumentsSchema { 
    id: string
    relacion: string
    nota?: string
}

export interface DocumentsRequiredByEmploymentRelationshipsSchema { 
    id: string, 
    requerimientos: string[]
}


export interface DocumentsSchema  {
    id: string
    nombre: string
    nota?: string
}
