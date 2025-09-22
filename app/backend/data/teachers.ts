
export const employmentRelationships: string[] = [
    "Personal de Planta",
    "Personal a Contrata",
    "Convenio a Honorario",
    "Estudiante de Posgrado",
    "Estudiante de Pregrado",
    "Sin Vinculo laboral con la UCH"
] as const;

export type EmploymentRelationship = typeof employmentRelationships[number]

export type documents = {
    id: string
    nombre: string
    nota?: string
}

const docs: Record<string, documents> = {
    cv: {
        id: "cv",
        nombre: "Curriculum Vitae Actualizado"
    },
    id_cl: {
        id: "id_cl",
        nombre: "Cédula de identidad al día"
    },
    titulo_prof: {
        id: "titulo_prof",
        nombre: "Título profesional"
    },
    matricula_pre: {
        id: "matricula_pre",
        nombre: "Certificado de alumno regular",
        nota: "Matrícula vigente en algún plan de estudio de Pregrado de la Universidad de Chile, acreditado con certificado de Alumno Regular con vigencia en el semestre actual (descargable desde Ucampus)."
    },
    form_cc: {
        id: "form_cc",
        nombre: "Formulario de cuenta corriente",
        nota: "Ingresa a https://form-dirbde.uchile.cl/cuenta-corriente una vez ingresados los datos, enviar el respaldo (puede ser un print de pantalla)."
    },
    foces: {
        id: "foces",
        nombre: "Formulario FOCES",

        nota: "Ingresa a https://foces.uchile.cl/auth/login Una vez completado, descargar el certificado y envialo."
    }
}

const requiredBy: Record<EmploymentRelationship, string[]> = {
    "Personal de Planta": ["cv", "id_cl"],
    "Personal a Contrata": ["cv", "id_cl"],
    "Convenio a Honorario": ["cv", "id_cl", "titulo_prof"],
    "Estudiante de Posgrado": ["cv", "id_cl", "titulo_prof"],
    "Estudiante de Pregrado": [ "matricula_pre", "form_cc", "foces"],
    "Sin Vinculo laboral con la UCH": ["cv", "id_cl"]
}
export function getDocumentsFor(rel: EmploymentRelationship): documents[] {
    return (requiredBy[rel] ?? []).map(id => docs[id])
}