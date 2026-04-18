import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://traffic-sms-notifier.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401 && !error.config.url.includes('/api/token')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default apiClient;
