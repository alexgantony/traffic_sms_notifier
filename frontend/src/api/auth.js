import apiClient from './client';

export const login = (username, password, rememberMe) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  return apiClient
    .post('/api/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then((response) => {
      const accessToken = response.data.access_token;
      if (rememberMe) {
        localStorage.setItem('token', accessToken);
      } else {
        sessionStorage.setItem('token', accessToken);
      }

      console.log('Data:', response.data);
      console.log('Status:', response.status);

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const getToken = () => {
  if (localStorage.getItem('token')) {
    return localStorage.getItem('token');
  } else {
    return sessionStorage.getItem('token');
  }
};
