import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://volleyhub-api.onrender.com/api",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const isAuthenticated = () => {
  return !!axiosInstance.defaults.headers.common.Authorization;
};