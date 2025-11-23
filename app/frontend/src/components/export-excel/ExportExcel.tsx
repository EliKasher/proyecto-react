import React, { useState } from "react";
import ExcelJS from "exceljs";

interface Course {
    _id: string;
    name: string;
    faculty: string;
    purpose: string;
}

interface Faculty {
    _id: string;
    short_name: string;
    full_name: string;
}

interface CourseDate {
    course: string;
    start_date: string;
    end_date?: string;
}

const ExportExcel: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);

        try {
            const [coursesRes, facultiesRes, datesRes] = await Promise.all([
                fetch("/api/courses"),
                fetch("/api/faculties"),
                fetch("/api/course-dates"),
            ]);

            if (!coursesRes.ok || !facultiesRes.ok || !datesRes.ok) {
                throw new Error("No se pudieron cargar los datos del servidor.");
            }

            const courses: Course[] = await coursesRes.json();
            const faculties: Faculty[] = await facultiesRes.json();
            const courseDates: CourseDate[] = await datesRes.json();

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Cursos");

            worksheet.addRow([
                "Número",
                "Nombre curso",
                "Facultad",
                "Nombre Facultad",
                "Fecha",
                "Propósito del curso"
            ]);

            const facultyMap = new Map(faculties.map(f => [f._id, f]));
            const dateMap = new Map(courseDates.map(d => [d.course, d]));

            let count = 1;
            for (const course of courses) {
                const faculty = facultyMap.get(course.faculty);
                const courseDate = dateMap.get(course._id);
                let dateText = "";
                if (courseDate) {
                    if (courseDate.start_date && courseDate.end_date) {
                        dateText = `${courseDate.start_date} - ${courseDate.end_date}`;
                    } else if (courseDate.start_date) {
                        dateText = courseDate.start_date;
                    }
                }

                worksheet.addRow([
                    count,
                    course.name,
                    faculty?.short_name ?? "",
                    faculty?.full_name ?? "",
                    dateText,
                    course.purpose
                ]);
                count++;
            }

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "cursos.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            setError("No se pudo generar el archivo Excel.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDownload} disabled={loading}>
                {loading ? "Generando..." : "Descargar Excel"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ExportExcel;
