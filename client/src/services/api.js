import axios from 'axios';

const API_URL = 'http://18.221.184.203/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) =>
  api.post('/auth/login', { username, password });

export const getInjuries = () => api.get('/injuries');

export const createInjury = (injury) => api.post('/injuries', injury);

export const deleteInjury = (id) => api.delete(`/injuries/${id}`);

export default api;
