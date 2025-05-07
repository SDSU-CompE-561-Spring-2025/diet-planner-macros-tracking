import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://backend:8000/api", // Updated to use the backend service name in Docker
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
