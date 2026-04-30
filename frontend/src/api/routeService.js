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

export const createRoute = async (routeData) => {
  let data = null;
  let error = null;

  const transformedData = {
    name: routeData.name,
    origin: routeData.origin,
    destination: routeData.destination,
    check_time: routeData.checkTime,
  };

  try {
    const response = await apiClient.post('/routes', transformedData);
    data = response.data;
  } catch (err) {
    error = err;
  }
  return { data, error };
};

export const deleteRoute = async (routeId) => {
  let data = null;
  let error = null;

  try {
    const response = await apiClient.delete(`routes/${routeId}`);
    const data = response.data;
  } catch (err) {
    const error = err;
  }
  return { data, error };
};
