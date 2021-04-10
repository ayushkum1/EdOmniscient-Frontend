import axios from "axios";
import qs from "qs";
import getAuthHeader from "./getAuthHeader";

export const searchInstitutes = (courses, region, city, name) => {
  return axios.get("/api/institutes", {
    params: {
      courses: courses,
      region: region,
      city: city,
      name: name,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getInstituteById = (instituteId) => {
  return axios.get(`/api/institutes/${instituteId}`);
};

export const getInstituteByAdmin = (token, adminEmail) => {
  return axios.get(`/api/institutes/admins/${adminEmail}`, {
    headers: getAuthHeader(token),
  });
};

export const getInstituteMediaThumbs = (instituteId) => {
  return axios.get(`/api/institutes/${instituteId}/gallery-thumbs`);
};

// export const getCoursesByInstitute = (id) => {
//   return axios.get("/api/courses", { params: id });
// };

export const getAllInstitutes = async (token) => {
  return axios.get("/api/institutes/all", {
    headers: getAuthHeader(token),
  });
};

export const getAllInstitutesShort = () => {
  return axios.get("/api/institutes/all/short");
};

export const getAllInstAdmin = async (token) => {
  return axios.get("/api/users/admins", {
    headers: getAuthHeader(token),
  });
};

export const saveInstitute = async (token, form, isUpdate) => {
  const requestBody = {
    instituteId: form.id,
    name: form.name,
    nick: form.nick,
    location: {
      streetAddr: form.streetAddr,
      geography: {
        city: form.city,
        state: form.state,
        pinCode: form.pinCode,
        region: form.region,
      },
    },
    instituteAdmin: form.instAdmin,
  };

  if (isUpdate) {
    return axios.put(`/api/institutes/${form.id}`, requestBody, {
      headers: getAuthHeader(token),
    });
  } else {
    return axios.post("/api/institutes", requestBody, {
      headers: getAuthHeader(token),
    });
  }
};

export const deleteInstitute = async (token, instituteId) => {
  return axios.delete(`/api/institutes/${instituteId}`, {
    headers: getAuthHeader(token),
  });
};
