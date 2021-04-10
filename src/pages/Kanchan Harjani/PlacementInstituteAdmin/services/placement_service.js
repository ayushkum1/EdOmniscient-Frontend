import axios from "axios";
import getAuthHeader from "../../../../services/getAuthHeader";
import http from "./http-common";

// export const addPlacementRecord = (data) => {
//   console.log(data);
//   return http.post(data);
// };

export const addPlacementRecord = (token, instituteId, placement) => {
  return http.post(
    `${instituteId}/placements`,
    {
      courseName: placement.courseName,
      noPlacedStudents: placement.noPlacedStudents,
      totalStudents: placement.totalStudents,
      batch: placement.batch.toUpperCase(),
      year: placement.year,
      maxLPAOffered: placement.maxLPAOffered,
      avgLPAOffered: placement.avgLPAOffered,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};
export const updatePlacementRecord = (token, instituteId, placement) => {
  return http.put(
    `${instituteId}/placements/${placement.id}`,
    {
      id: placement.id,
      courseName: placement.courseName,
      noPlacedStudents: placement.noPlacedStudents,
      totalStudents: placement.totalStudents,
      batch: placement.batch.toUpperCase(),
      year: placement.year,
      maxLPAOffered: placement.maxLPAOffered,
      avgLPAOffered: placement.avgLPAOffered,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

export const deletePlacementRecord = (token, instituteId, id) => {
  return http.delete(`${instituteId}/placements/${id}`, {
    headers: getAuthHeader(token),
  });
};

export const getPlacementRecords = (token, instituteId) => {
  return http.get(`${instituteId}/placements`, {
    headers: getAuthHeader(token),
  });
};
