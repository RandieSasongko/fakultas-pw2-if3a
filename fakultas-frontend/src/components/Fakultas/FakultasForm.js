// src/components/Fakultas/FakultasForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fakultasService } from '../../services/auth';
import AlertService from '../../services/alertService';

const FakultasForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    foto: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      loadFakultas();
    }
  }, [id]);

  const loadFakultas = async () => {
    try {
      const response = await fakultasService.getById(id);
      const fakultas = response.data.data;
      setFormData({
        nama: fakultas.nama,
        deskripsi: fakultas.deskripsi || '',
        foto: null,
      });
      if (fakultas.foto_url) {
        setPreview(fakultas.foto_url);
      }
    } catch (error) {
      setError('Failed to load fakultas');
      console.error('Error loading fakultas:', error);
      AlertService.error('Error', 'Failed to load faculty data');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file size (max 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      AlertService.warning('File Too Large', 'Please select an image smaller than 5MB');
      return;
    }

    // Validate file type
    if (file && !file.type.startsWith('image/')) {
      AlertService.warning('Invalid File Type', 'Please select an image file');
      return;
    }

    setFormData({
      ...formData,
      foto: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await fakultasService.update(id, formData);
        AlertService.success('Updated!', 'Faculty has been updated successfully.');
      } else {
        await fakultasService.create(formData);
        AlertService.success('Created!', 'New faculty has been created successfully.');
      }
      navigate('/fakultas');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save fakultas';
      setError(message);
      console.error('Error saving fakultas:', error);
      AlertService.error('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Fakultas' : 'Create New Fakultas'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Update faculty information' : 'Add a new faculty to the university'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Fakultas */}
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
              Faculty Name *
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
              placeholder="Enter faculty name"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 resize-vertical"
              placeholder="Enter faculty description"
            />
          </div>

          {/* Foto Upload */}
          <div>
            <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-2">
              Faculty Photo
            </label>
            <div className="space-y-4">
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500">Max file size: 5MB. Supported formats: JPG, PNG, GIF</p>
              
              {preview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-w-xs max-h-48 rounded-lg mx-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEdit ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                isEdit ? 'Update Faculty' : 'Create Faculty'
              )}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/fakultas')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FakultasForm;