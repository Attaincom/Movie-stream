import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`, // Adjust this if needed
});

export const register = (userData) => API.post('/auth/register', userData);

export const login = (credentials) => API.post('/auth/login', credentials); // already fixed

export const resetPassword = (data) => API.post('/auth/reset-password', data); // ✅ ADD THIS

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};
