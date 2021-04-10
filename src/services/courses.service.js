import axios from "axios";
import getAuthHeader from "./getAuthHeader";

export const getAllCoursesShort = (token) => {
  return axios.get("/api/courses/short");
};

export const getAllCourses = (token) => {
  return axios.get("/api/courses", {
    headers: getAuthHeader(token),
  });
};

export const deleteCourse = (token, courseId) => {
  return axios.delete(`/api/courses/${courseId}`, {
    headers: getAuthHeader(token),
  });
};

export const getCoursesOfInstitute = (instituteId) => {
  return axios.get(`/api/all-courses`, {
    params: { instituteId: instituteId },
  });
};

export const patchInstiuteCourses = (token, instituteId, payload) => {
  return axios.patch(`/api/institutes/${instituteId}/courses`, payload, {
    headers: getAuthHeader(token),
  });
};
