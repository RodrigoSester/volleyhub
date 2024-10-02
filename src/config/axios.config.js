import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://volleyhub-api.onrender.com",
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
