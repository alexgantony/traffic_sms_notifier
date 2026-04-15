import apiClient from './client';

export const login = (username, password) => {
  return apiClient.post('/token', { username, password }).then((response) => {
    const accessToken = response.data.access_token;
    localStorage.setItem('token', accessToken);
    console.log('Data:', response.data);
    console.log('Status:', response.status);

    return response.data;
  });
};
