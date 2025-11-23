import axiosSecure from "../utils/axiosSecure";
import type { RegisterForm } from "../types/course";

const baseUrl = "api/";

// Course register
const postCourse = async (course: RegisterForm & { state: number }) => {
  try {
    const response = await axiosSecure.post(baseUrl + "courses", course);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Faculties available
const getFaculties = () => {
  const request = axiosSecure.get(baseUrl + "faculties");
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
};

// Educational levels available
const getEducationalLevels = () => {
  const request = axiosSecure.get(baseUrl + "educational-levels");
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
};

// Dates on which the course can be done
const getCourseDates = () => {
  const request = axiosSecure.get(baseUrl + "course-dates");
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
};

// Contractual relationship with the employer
const getEmploymentRelationships = () => {
  const request = axiosSecure.get(baseUrl + "contractual-relations");
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
};

// The documents that have to be uploaded
const getRequiredDocuments = () => {
  const request = axiosSecure.get(baseUrl + "documents");
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
};

// The registered courses
const getCourses = () => {
  const request = axiosSecure.get(baseUrl + "courses");
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
  getCourses,
};
