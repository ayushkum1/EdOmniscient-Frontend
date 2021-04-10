import axios from "axios";
import getAuthHeader from "./getAuthHeader";

export const getAllMediaByInstituteId = (instituteId) => {
  return axios.get("/api/institutes", { param: instituteId });
};

export const fetchData = (instituteId) => {
  return axios.get(`/api/institutes/${instituteId}/media`);
};

export const deleteMedia = (token, instituteId, mediaId) => {
  return axios.delete(`/api/institutes/${instituteId}/media/${mediaId}`, {
    headers: getAuthHeader(token),
  });
};

export const saveMedia = (token, instituteId, form) => {
  return axios.post(
    `/api/institutes/${instituteId}/media/video`,
    {
      urls: [form.url],
      mediaType: "VIDEO",
      category: form.category,
      name: "Institute_Video",
      instituteId: instituteId,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};
