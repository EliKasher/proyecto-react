import axios from "axios";
import type { ITeacherLogin, ITeacherRegister } from "../types/teacher";

//usamos por ahora el por defecto de json-server

const baseUrl = "/api/";

const postTeacher = (newTeacher: ITeacherRegister) => {
    const request = axios.post(baseUrl + "teachers", newTeacher);
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const teacherLogin = async (teacherCredentials: ITeacherLogin) => {
    const response = await axios.post(baseUrl + "teacher-login", teacherCredentials)

    const csrfToken = response.headers['x-csrf-token'];
    if (csrfToken) {
        localStorage.setItem('csrfToken', csrfToken);
    }

    return response.data;
}

export default {
    postTeacher,
    teacherLogin
};
