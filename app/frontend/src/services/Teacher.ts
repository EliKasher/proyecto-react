import axiosSecure from "../utils/axiosSecure";
import type { ITeacherRegister } from "../types/users";

//usamos por ahora el por defecto de json-server

const baseUrl = "api/";

const postTeacher = (newTeacher: ITeacherRegister) => {
  const { confirm_password, ...teacherToSend } = newTeacher;

  const request = axiosSecure.post(baseUrl + "teachers", teacherToSend);
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
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
  postTeacher,
  getTeacherCourses,
};
