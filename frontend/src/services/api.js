import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle different content types and URL normalization
api.interceptors.request.use((config) => {
  // For form data, set the correct content type
  if (config.data instanceof URLSearchParams) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  
  // Log the final request URL and data for debugging
  console.log('Making request:', {
    url: `${baseURL}${config.url}`,
    method: config.method,
    headers: config.headers,
    data: config.data
  });
  
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    return Promise.reject(error);
  }
);

export default api;
