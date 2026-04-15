import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://traffic-sms-notifier.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
