import axiosSecure from "../utils/axiosSecure";
import type { ITeacherRegister } from "../types/users";

const baseUrl = "api/";

const getTeacher = (id: string) => {
    const request = axiosSecure.get(baseUrl + `teachers/${id}`);
    return request.then((response) => { return response.data });
};

const postTeacher = (newTeacher: ITeacherRegister) => {
  const { confirm_password, ...teacherToSend } = newTeacher;

  const request = axiosSecure.post(baseUrl + "teachers", teacherToSend);
  return request.then((response) => { return response.data });
};

const getTeacherCourses = async (teacherId: string) => {
    try {
      const response = await axiosSecure.get(
        baseUrl + `teachers/${teacherId}/courses`
      );

      return response.data;
    } catch (error: any) {
      throw new Error(`Ocurrió un error al obtener los cursos: ${error.message}`);
    }
};

export default {
  getTeacher,
  postTeacher,
  getTeacherCourses,
};
