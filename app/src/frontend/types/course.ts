export interface Course {
    name: string;
    faculty: string;
    educational_level: Array<string>;
    start_date: CourseDate;
    quota: number; // min 25
    course_purpose: string;
    learning_objectives: Array<string> | null;
    weekly_planification: Array<DailyPlanification>; // 5 days
    teachers_data: Teacher;
    staff: Array<Staff>;
    materials: Array<Material>;
}

export interface DailyPlanification {
    day: number;
    first_period: string; 
    first_classroom: string | null;
    second_period: string;
    second_classroom: string | null;
}

export interface Teacher {
    first_name: string;
    last_name: string;
    rut: string;
    email: string;
    phone: string;
    degree: string;
    college_relationship: string;
}

export interface Staff {
    first_name: string;
    last_name: string;
    rut: string;
    email: string;
    phone: string;
    position: string;
}

export interface Material {
    name: string;
    quantity: number;
    link: string;
}

export interface CourseDate {
    start_date: string;
    end_date: string;
    start_month: string;
    end_month: string;
}