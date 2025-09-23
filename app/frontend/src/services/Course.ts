import axios from "axios";
import type { InscryptionForm } from "../types/course";


const baseUrl = import.meta.env.VITE_BASE_DB_URL

const postCourse = ( 
    course: InscryptionForm
) => {
    const request = axios.post(baseUrl + "courses", course)
    return request.then((response) => response.data)
}

export default { 
    postCourse
}