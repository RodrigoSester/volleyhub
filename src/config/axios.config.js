import axios from "axios";
import storageConfig from "./storage.config";

storageConfig.create();

const _requestHandler = async request => {
  request.requestStartTime = Date.now();
  request.headers.Authorization = await storageConfig.get('authorization');
  return request;
};

const _errorHandler = error => {
  if (error?.response?.status === 404) {
    return Promise.reject(error.response);
  }

  error.message = error?.response?.data?.error?.message;

  return Promise.reject(error);
};

const _successHandler = response => {
  const requestTime = Date.now() - response.config.requestStartTime;
  console.log('requestTime', requestTime);
  return response;
};

const customAxios = () => {
  const instance = axios.create({
    headers: {
      Accept         : 'application/json',
      'Content-Type' : 'application/json',
    },
    baseURL          : "http://localhost:3000/api",
  });

  instance.interceptors.request.use(request => _requestHandler(request));

  instance.interceptors.response.use(
    response => _successHandler(response),
    error => _errorHandler(error)
  );

  return instance;
};

export const axiosInstance = customAxios();

export const setToken = async (token) => {
  await storageConfig.set('authorization', token);
};

export const isAuthenticated = async () => {
  return await storageConfig.get('authorization');
};