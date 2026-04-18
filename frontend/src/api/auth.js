import apiClient from './client';

export const login = (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  return apiClient
    .post('/api/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then((response) => {
      const accessToken = response.data.access_token;
      localStorage.setItem('token', accessToken);
      console.log('Data:', response.data);
      console.log('Status:', response.status);

      return response.data;
    });
};
