import axios from "axios";
import type { RegisterForm } from "../types/course";

//usamos por ahora el por defecto de json-server
const baseUrl = "http://localhost:3000/";

const postCourse = (course: RegisterForm) => {
    const request = axios.post(baseUrl + "cursos", course);
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getFaculties = () => {
    const request = axios.get(baseUrl + "facultades");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getEducationalLevels = () => {
    const request = axios.get(baseUrl + "niveles");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getCourseDates = () => {
    const request = axios.get(baseUrl + "fechas");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getEmploymentRelationships = () => {
    const request = axios.get(baseUrl + "relacion_contractual");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getRequiredDocuments = () => {
    const request = axios.get(baseUrl + "documentos");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getDocumentsRequiredByEmploymentRelationships = () => {
    const request = axios.get(baseUrl + "requerimientos_documentos");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getCourses = () => {
    const request = axios.get(baseUrl + "cursos");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};


export default {
    postCourse,
    getCourseDates,
    getFaculties,
    getEducationalLevels,
    getEmploymentRelationships,
    getDocumentsRequiredByEmploymentRelationships,
    getRequiredDocuments,
    getCourses
};
