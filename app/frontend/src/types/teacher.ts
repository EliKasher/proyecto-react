export interface ITeacherRegister {
    first_name: string;
    last_name: string;
    rut: string;
    email: string;
    phone: string;
    degree: string;
    college_relationship: string;
    password: string;
}

export interface ITeacherLogin {
    rut: string;
    password: string;
}