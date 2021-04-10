import getAuthHeader from "../../../services/getAuthHeader";
import http from "./http-common";

export const getMembers = (token, instituteId) => {
  return http.get(`/${instituteId}/members`, {
    headers: getAuthHeader(token),
  });
};

export const getApprovedMembers = (token, instituteId) => {
  return http.get(`/${instituteId}/members/approved`, {
    headers: getAuthHeader(token),
  });
};

export const addMember = (token, instituteId, member) => {
  return http.post(
    `/${instituteId}/members`,
    {
      userEmail: member.userEmail,
      courseId: member.courseId,
      prn: member.prn,
      memberType: member.memberType,
      publicPhone: member.publicPhone,
      publicEmail: member.publicEmail,
      year: member.year,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

export const updateMember = (token, member, instituteId, memberId) => {
  return http.put(
    `${instituteId}/members/${memberId}`,
    {
      publicPhone: member.publicPhone,
      publicEmail: member.publicEmail,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

export const deleteMember = (token, instituteId, memberId) => {
  return http.delete(`/${instituteId}/members/${memberId}`, {
    headers: getAuthHeader(token),
  });
};

export const patchMemberStatus = (token, instituteId, memberId, op) => {
  return http.patch(
    `/${instituteId}/members/${memberId}`,
    {
      op: op,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

export const applyMembership = (token, instituteId, userEmail, form) => {
  return http.post(
    `/${instituteId}/members`,
    {
      userEmail: userEmail,
      courseId: form.courseId,
      prn: form.prn,
      memberType: form.memberType,
      publicPhone: form.phone,
      publicEmail: form.email,
      year: form.year.getFullYear(),
    },
    {
      headers: getAuthHeader(token),
    }
  );
};
