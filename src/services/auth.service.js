import axios from "axios";

export const doLogin = (username, password) => {
  return axios.post("/api/auth/login", {
    username: username,
    password: password,
  });
  // .then((resp) => {

  // })
  // .catch((err) => {

  // });
};

export const doLogout = () => {
  return axios.post("/api/auth/logout");
};

export const refreshLogin = () => {
  return axios.get("/api/auth/refresh");
};

export const isAuth = () => {
  return localStorage.getItem("isAuth") === "true";
};
