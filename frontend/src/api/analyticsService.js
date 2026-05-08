import apiClient from './client';

export const getAnalytics = async (routeId) => {
  let data = null;
  let error = null;
  try {
    const response = await apiClient.get(`/analytics/${routeId}`);
    data = response.data;
  } catch (err) {
    error = err;
  }
  return { data, error };
};
