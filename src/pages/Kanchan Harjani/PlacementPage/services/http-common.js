import axios from "axios";

export default axios.create({
  baseURL: "/api/institutes/",
  headers: {
    "Content-type": "application/json",
  },
});
