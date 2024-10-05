import axios from "axios";
import storageConfig from "./storage.config";
import { jwtDecode } from 'jwt-decode';

storageConfig.create();

const _requestHandler = async request => {
  request.requestStartTime = Date.now();
  request.headers.Authorization = await storageConfig.get('authorization');
  return request;
};

const _refreshToken = async () => {
  const refreshToken = await storageConfig.get('refreshToken');
  const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
  await setToken(response.data.body);
}

const _errorHandler = async error => {
  if (error?.response?.status === 404) {
    return Promise.reject(error.response);
  }

  if (error?.response?.status === 401) {
    try {
      await _refreshToken();
      return axiosInstance(error.config);
    } catch (error) {
      console.error('Error refreshing token', error);
      
    }
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

export const setToken = async ({ token, refreshToken }) => {
  await storageConfig.set('authorization', token);
  await storageConfig.set('refreshToken', refreshToken);
};

export const isAuthenticated = async () => {
  const token = await storageConfig.get('authorization');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error('Invalid token', error);
    return false;
  }
};