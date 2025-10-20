import axiosSecure from "../utils/axiosSecure";
import type { ITeacherRegister } from "../types/users";

//usamos por ahora el por defecto de json-server

const baseUrl = "api/";

const postTeacher = (newTeacher: ITeacherRegister) => {
  const request = axiosSecure.post(baseUrl + "teachers", newTeacher);
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
};

export default {
  postTeacher,
};
