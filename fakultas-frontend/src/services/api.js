import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Buat instance axios untuk API calls
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // Penting untuk cookies
});

// Instance khusus untuk sanctum endpoints
const sanctum = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Step 1: Dapatkan CSRF cookie terlebih dahulu
export const getCsrfToken = async () => {
  try {
    await sanctum.get('/sanctum/csrf-cookie');
    return true;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return false;
  }
};

// Interceptor untuk menambahkan token
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Pastikan headers untuk multipart form data
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  
  config.headers['Accept'] = 'application/json';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.status === 419) {
      // CSRF token mismatch, refresh token
      await getCsrfToken();
      // Retry original request
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;