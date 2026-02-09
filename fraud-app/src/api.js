import axios from "axios";

export const api = axios.create({
  baseURL: "https://fraud-detection-project-qbdo.onrender.com", // change this
  headers: {
    "Content-Type": "application/json",
  },
});
