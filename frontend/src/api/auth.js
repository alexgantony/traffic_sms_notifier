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

export const register = (username, password, email, phoneNumber) => {
  return apiClient
    .post('/users/', {
      username,
      password,
      email,
      phone_number: phoneNumber,
    })
    .then((response) => {
      return response.data;
    });
};
