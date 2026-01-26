import axios from "axios";

export const api = axios.create({
  baseURL: "http://YOUR_BACKEND_IP:8000", // change this
  headers: {
    "Content-Type": "application/json",
  },
});
