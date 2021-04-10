import axios from "axios";
import getAuthHeader from "./getAuthHeader";

export const getAcademicCalendar = (token, instituteId) => {
  return axios.get(`/api/institutes/${instituteId}/calendar`, {
    headers: getAuthHeader(token),
  });
};

export const deleteAcademicEvent = (token, instituteId, eventId) => {
  return axios.delete(
    `/api/institutes/${instituteId}/delete-event/${eventId}`,
    {
      headers: getAuthHeader(token),
    }
  );
};
