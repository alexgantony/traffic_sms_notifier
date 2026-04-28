import apiClient from './client';

export const fetchRoutes = async () => {
  let data = null;
  let error = null;
  try {
    const response = await apiClient.get('/routes');
    data = response.data;
    data = data.map(({ check_time, ...rest }) => ({
      ...rest,
      checkTime: check_time.slice(0, 5),
    }));
  } catch (err) {
    error = err;
  }
  return { data, error };
};
