export interface RegisterForm {
  currentPageNumber: number;
  currentPageIsValid: boolean;
  showErrors: boolean;
  course_data: CourseData;
  program_content: ProgramContent;
  weekly_planification: DailyPlanification[]; // 5 days
  staff: Staff[];
  materials: Material[];
  state: number | null;
  id: string | null;
}

export interface CourseData {
  name: string;
  faculty: string;
  educational_level: string[];
  quota: number; // min 25
  course_start: CourseDate[];
}

export interface ProgramContent {
  course_purpose: string;
  learning_objectives: string[];
}

export interface DailyPlanification {
  day: number;
  first_period: string;
  first_classroom: string;
  second_period: string;
  second_classroom: string;
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
