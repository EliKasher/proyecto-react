import axios from "axios";
import type { RegisterForm } from "../types/course";

//usamos por ahora el por defecto de json-server
const baseUrl = "/api/";

const postCourse = (course: RegisterForm) => {
    const request = axios.post(baseUrl + "courses", course);
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getFaculties = () => {
    const request = axios.get(baseUrl + "faculties");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getEducationalLevels = () => {
    const request = axios.get(baseUrl + "educational-levels");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getCourseDates = () => {
    const request = axios.get(baseUrl + "course-dates");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getEmploymentRelationships = () => {
    const request = axios.get(baseUrl + "contractual-relations");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};

const getRequiredDocuments = () => {
    const request = axios.get(baseUrl + "documents");
    return request.then((response) => {
        console.log("success");
        return response.data;
    });
};


const getCourses = () => {
    const request = axios.get(baseUrl + "courses");
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
    getRequiredDocuments,
    getCourses
};
