// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';
import AlertService from '../services/alertService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { access_token, user } = response.data;
      
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser(user);
      
      AlertService.success('Login successful!', `Welcome back, ${user.name}!`);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      let message = 'Login failed';
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        message = Object.values(errors).flat().join(', ');
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      
      AlertService.error('Login Failed', message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      AlertService.success('Registration successful!', 'Please login to continue.');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      
      let message = 'Registration failed';
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        message = Object.values(errors).flat().join('\n');
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      
      AlertService.error('Registration Failed', message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    AlertService.info('Logged out', 'You have been successfully logged out.');
  };

  const getUser = async () => {
    try {
      const response = await authService.getUser();
      setUser(response.data.user);
    } catch (error) {
      console.error('Get user failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};