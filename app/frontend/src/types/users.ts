export interface IRegister {
  first_name: string;
  last_name: string;
  role: string;
  rut: string;
  email: string;
  password: string;
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
