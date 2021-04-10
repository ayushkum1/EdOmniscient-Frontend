import axios from "axios";
import getAuthHeader from "../../../services/getAuthHeader";
import http from "./http-common";

export const getAllReviews = (token) => {
  return axios.get(`/api/reviews/`, {
    headers: getAuthHeader(token),
  });
};

export const getReviews = (token, instituteId) => {
  return http.get(`/${instituteId}/reviews`, {
    headers: getAuthHeader(token),
  });
};

export const getReviewByUserEmail = (token, instituteId, userEmail) => {
  return http.get(`/${instituteId}/reviews/${userEmail}`, {
    headers: getAuthHeader(token),
  });
};

export const getAverageRating = (instituteId) => {
  return http.get(`/${instituteId}/reviews/average-rating`);
};

export const addReviewRecord = (token, instituteId, review) => {
  return http.post(
    `/${instituteId}/reviews`,
    {
      userEmail: review.userEmail,
      memberId: review.memberId,
      rating: review.rating,
      content: review.content,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

export const updateReviewRecord = (token, instituteId, reviewId, review) => {
  return http.put(
    `${instituteId}/reviews/${reviewId}`,
    {
      userEmail: review.userEmail,
      memberId: review.memberId,
      rating: review.rating,
      content: review.content,
    },
    {
      headers: getAuthHeader(token),
    }
  );
};

export const deleteReviewRecord = (token, reviewId) => {
  return axios.delete(`/api/reviews/${reviewId}`, {
    headers: getAuthHeader(token),
  });
};
