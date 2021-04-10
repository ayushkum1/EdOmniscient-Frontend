import http from "./http-common";
import axios from "axios";
import getAuthHeader from "../../../../services/getAuthHeader";

export const getAllPlacementRecords = (token, instituteId) => {
  return http.get(`/${instituteId}/placements`, {
    headers: getAuthHeader(token),
  });
};

export const getLastNPlacementRecords = (token, instituteId, batches) => {
  return http.get(`/${instituteId}/placements/${batches}`, {
    headers: getAuthHeader(token),
  });
};

export const getCardsData = (token, instituteId, batch, year, courseName) => {
  return http.get(`/${instituteId}/placements/${batch}/${year}/${courseName}`, {
    headers: getAuthHeader(token),
  });
};

export const getChartData = (token, instituteId, courseName) => {
  return axios.get(
    `/api/institutes/${instituteId}/placements/course/${courseName}`,
    {
      headers: getAuthHeader(token),
    }
  );
};

export const getInstituteData = (token, id) => {
  return axios.get(`/api/institutes/${id}`, { headers: getAuthHeader(token) });
};

export const getCourses = (token, instituteId) => {
  return axios.get(`/api/all-courses?instituteId=${instituteId}`, {
    // params: { instituteId: instituteId },
    headers: getAuthHeader(token),
  });
};

export const listOfCourses = [
  "PG-DBDA",
  "PG-DAC",
  "PG-DIoT",
  "PG-DMC",
  "PG-DHPCSA",
  "PG-DESD",
  "PG-DSSD",
  "PG-DITISS",
  "PG-DGi",
];
