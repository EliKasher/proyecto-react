export interface IRegister {
  first_name: string;
  last_name: string;
  role: string;
  rut: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ITeacherRegister extends IRegister {
  phone: string;
  degree: string;
  college_relationship: string;
}

export interface IFunctionaryRegister extends IRegister {}

export interface ILogin {
  rut: string;
  password: string;
}

type roles = "teacher" | "functionary" | "";

export interface IUser {
  logged: boolean;
  roles: roles;
  first_name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  id: string;
}
