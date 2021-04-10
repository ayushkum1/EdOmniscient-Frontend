import axios from "axios";

export default axios.create({
  baseURL: "/api/institutes",
  headers: {
    "Content-type": "application/json",
  },
});

// http://localhost:8080/institutes/15001/reviews/id
