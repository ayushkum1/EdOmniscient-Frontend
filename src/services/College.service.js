import axios from "axios";

export const getAllMembers = (instituteId) => {
  return axios.get(`/api/institutes/${instituteId}/members`);
};
