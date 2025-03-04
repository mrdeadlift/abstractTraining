import api from './api';
import { UserLogin, UserRegistration, UserProfile } from '../types/auth';

export const login = async (credentials: UserLogin) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: UserRegistration) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
}; 