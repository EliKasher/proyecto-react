import axios from "axios";
import type { RegisterForm } from "../types/course";

//usamos por ahora el por defecto de json-server
const baseUrl = "http://localhost:3000/"

const postCourse = (
    course: RegisterForm
) => {
    const request = axios.post(baseUrl + "cursos", course)
    return request.then((response) => response.data)
}

export default {
    postCourse
}