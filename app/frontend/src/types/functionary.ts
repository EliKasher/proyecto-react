export interface IFunctionaryRegister {
    first_name: string;
    last_name: string;
    role: string;
    rut: string;
    email: string;
    password: string;
}

export interface IFunctionaryLogin {
    rut: string;
    password: string;
}