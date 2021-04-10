import axios from "axios";
import getAuthHeader from "../../../services/getAuthHeader";

export const getUserCount = (token) => {
  return axios.get(`/api/counts/users`, {
    headers: getAuthHeader(token),
  });
};

export const getInstituteCount = (token) => {
  return axios.get(`/api/counts/institutes`, {
    headers: getAuthHeader(token),
  });
};

export const getCourseCount = (token) => {
  return axios.get(`/api/counts/courses`, {
    headers: getAuthHeader(token),
  });
};

export const getReviewCount = (token) => {
  return axios.get(`/api/counts/reviews`, {
    headers: getAuthHeader(token),
  });
};

export const getMemberCount = (token) => {
  return axios.get(`/api/counts/members`, {
    headers: getAuthHeader(token),
  });
};
