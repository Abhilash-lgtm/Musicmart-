import axios from 'axios';

// Base URL for the JSON Server backend API
// Uses VITE_API_URL env variable in production (set in Render dashboard),
// falls back to localhost:5000 for local development.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create a configured Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('musicmart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle common response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear storage if unauthorized
      localStorage.removeItem('musicmart_token');
      localStorage.removeItem('musicmart_user');
    }
    return Promise.reject(error);
  }
);

export default api;
