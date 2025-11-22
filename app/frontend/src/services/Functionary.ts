import axiosSecure from "../utils/axiosSecure";
import type { ILogin, IFunctionaryRegister } from "../types/users";

const baseUrl = "api/";

const getFunctionary = (id: string) => {
  const request = axiosSecure.get(baseUrl + `functionaries/${id}`);
  return request.then((response) => { return response.data });
};

const postFunctionary = (newFunctionary: IFunctionaryRegister) => {
  const request = axiosSecure.post(baseUrl + "functionaries", newFunctionary);
  return request.then((response) => {
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
  getFunctionary,
  postFunctionary,
  functionaryLogin,
};
