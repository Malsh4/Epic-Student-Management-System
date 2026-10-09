import axios from "axios";

export const API_BASE = "http://localhost:9090/api";

const api = axios.create({ baseURL: API_BASE });

// Before every request: attach the saved login
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Basic ${token}`;
  return config;
});

// After every response: if the login is invalid → go to login page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
