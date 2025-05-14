import axios from "axios";

// Make sure we're using the correct port for the backend
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
  console.log('Making API request:', {
    url: `${baseURL}${config.url}`,
    method: config.method,
    headers: config.headers,
    data: typeof config.data === 'string' ? config.data : JSON.stringify(config.data)
  });
  
  // Get token from both cookie and localStorage
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] 
    || localStorage.getItem('token');
    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response received:', {
      url: response.config.url,
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
      headers: error.response?.headers,
      message: error.message
    });

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/login';
    } else if (!error.response) {
      // Network error or server not responding
      console.error('Network error or server not responding');
    }

    return Promise.reject(error);
  }
);

export default api;
