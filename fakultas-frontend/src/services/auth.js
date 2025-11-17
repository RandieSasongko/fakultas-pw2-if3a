// src/services/auth.js
import api from './api';

export const authService = {
  login: (email, password) => 
    api.post('/login', { email, password }),

  register: (userData) => 
    api.post('/register', userData),

  logout: () => 
    api.post('/logout'),

  getUser: () => 
    api.get('/user'),
};

export const fakultasService = {
  getAll: () => api.get('/fakultas'),
  getById: (id) => api.get(`/fakultas/${id}`),
  create: (data) => {
    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('deskripsi', data.deskripsi);
    if (data.foto) {
      formData.append('foto', data.foto);
    }
    return api.post('/fakultas', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('deskripsi', data.deskripsi);
    formData.append('_method', 'PUT');
    if (data.foto) {
      formData.append('foto', data.foto);
    }
    return api.post(`/fakultas/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/fakultas/${id}`),
  getProdis: (id) => api.get(`/fakultas/${id}/prodis`),
};

export const prodiService = {
  getAll: () => api.get('/prodis'),
  getById: (id) => api.get(`/prodis/${id}`),
  create: (data) => {
    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('fakultas_id', data.fakultas_id);
    if (data.foto) {
      formData.append('foto', data.foto);
    }
    return api.post('/prodis', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    formData.append('nama', data.nama);
    formData.append('fakultas_id', data.fakultas_id);
    formData.append('_method', 'PUT');
    if (data.foto) {
      formData.append('foto', data.foto);
    }
    return api.post(`/prodis/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/prodis/${id}`),
};