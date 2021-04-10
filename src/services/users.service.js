import axios from "axios";
import getAuthHeader from "./getAuthHeader";

export const getUserDetails = (token) => {
  return axios.get(`/api/users/current`, {
    headers: getAuthHeader(token),
  });
};

export const getAllUsers = (token) => {
  return axios.get(`/api/users`, {
    headers: getAuthHeader(token),
  });
};

export const deleteUser = (token, email) => {
  return axios.delete(`/api/users/${email}`, {
    headers: getAuthHeader(token),
  });
};

export const createUser = (form) => {
  const userUrl = `/api/users/register`;
  const adminUrl = `/api/users/register/institute`;

  console.log(form.asAdmin);
  return axios.post(form.asAdmin ? adminUrl : userUrl, {
    email: form.email,
    passwdHash: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    city: form.city,
    state: form.state,
    pinCode: form.pinCode,
    region: form.region,
  });
};

export const changePassword = (token, oldPass, newPass) => {
  return axios.patch(
    `/api/users/change_password`,
    {
      oldPassword: oldPass,
      newPassword: newPass,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};
