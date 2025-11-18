import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

const sanctum = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getCsrfToken = async () => {
  try {
    await sanctum.get('/sanctum/csrf-cookie');
    return true;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return false;
  }
};

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  
  config.headers['Accept'] = 'application/json';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.status === 419) {
      await getCsrfToken();
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;