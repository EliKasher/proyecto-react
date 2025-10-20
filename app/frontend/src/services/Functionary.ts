import axiosSecure from "../utils/axiosSecure";
import type { ILogin, IFunctionaryRegister } from "../types/users";

const baseUrl = "api/";

const postFunctionary = (newFunctionary: IFunctionaryRegister) => {
  const request = axiosSecure.post(baseUrl + "functionaries", newFunctionary);
  return request.then((response) => {
    console.log("success");
    return response.data;
  });
};

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

export default {
  postFunctionary,
  functionaryLogin,
};
