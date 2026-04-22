import apiClient from './client';

export const fetchRoutes = async () => {
  let data = null;
  let error = null;
  try {
    const response = await apiClient.get('/routes');
    data = response.data;
  } catch (err) {
    error = err;
  }
  return { data, error };
};
