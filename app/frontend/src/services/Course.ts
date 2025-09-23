import axios from "axios";
import type { Course } from "../types/course";


const baseUrl = import.meta.env.VITE_BASE_DB_URL

const postCourse = ( 
    course: Course
) => {
    console.log(baseUrl, "a")
    const request = axios.post(baseUrl + "courses", course)
    return request.then((response) => response.data)
}

export default { 
    postCourse
}