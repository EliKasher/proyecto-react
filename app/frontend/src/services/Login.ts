import axiosSecure from "../utils/axiosSecure";
import type { ILogin } from "../types/users";

const baseUrl = "api/";

const functionaryLogin = async (functionaryCredentials: ILogin) => {
  const response = await axiosSecure.post(
    baseUrl + "login/functionary",
    functionaryCredentials
  );

  const csrfToken = response.headers["x-csrf-token"];
  if (csrfToken) {
    localStorage.setItem("csrfToken", csrfToken);
  }

  return response.data;
};

const teacherLogin = async (teacherCredentials: ILogin) => {
  const response = await axiosSecure.post(
    baseUrl + "login/teacher",
    teacherCredentials
  );

  const csrfToken = response.headers["x-csrf-token"];
  if (csrfToken) {
    localStorage.setItem("csrfToken", csrfToken);
  }

  return response.data;
};

const restoreLogin = async () => {
  try {
    const response = await axiosSecure.post(baseUrl + "login/restore");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  functionaryLogin,
  teacherLogin,
  restoreLogin,
};
