import axios from "axios";
import type { IFunctionaryLogin, IFunctionaryRegister } from "../types/functionary";

//usamos por ahora el por defecto de json-server

const baseUrl = 'api/';

const postFunctionary = (newFunctionary: IFunctionaryRegister) => {
    const request = axios.post(baseUrl + "functionaries", newFunctionary);
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const functionaryLogin = async (functionaryCredentials: IFunctionaryLogin) => {
    const response = await axios.post(baseUrl + "functionary-login", functionaryCredentials)

    const csrfToken = response.headers['x-csrf-token'];
    if (csrfToken) {
        localStorage.setItem('csrfToken', csrfToken);
    }

    return response.data;
}

export default {
    postFunctionary,
    functionaryLogin
};
