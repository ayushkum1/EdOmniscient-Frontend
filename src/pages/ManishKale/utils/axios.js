import axios from "axios";
import getAuthHeader from "./../../../services/getAuthHeader";

const baseURL = "/api/users";

export const fetchUserById = (email) => {
  return axios.get(baseURL + "/" + email);
};

export const fetchMemberById = (token, memberId) => {
  return axios.get(`/api/users/member/${memberId}`, {
    headers: getAuthHeader(token),
  });
};

export const removeProfilePicture = (email, link, token) => {
  return axios.patch(
    baseURL + "/" + email,
    {
      profilePicLink: link,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

export const userUpdate = (
  email,
  about,
  city,
  fbProfile,
  linkedinProfile,
  firstName,
  lastName,
  streetAddr,
  state,
  profilePicLink,
  token
) => {
  return axios.put(
    baseURL + "/" + email,
    {
      about: about,
      city: city,
      state: state,
      streetAddr: streetAddr,
      fbProfile: fbProfile,
      linkedinProfile: linkedinProfile,
      firstName: firstName,
      lastName: lastName,
      profilePicLink: profilePicLink,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};
