const getAuthHeader = (token) => {
  return { Authorization: "Bearer " + token };
};

export default getAuthHeader;
