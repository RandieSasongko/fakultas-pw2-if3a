// src/components/Prodi/ProdiForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { prodiService, fakultasService } from '../../services/auth';
import AlertService from '../../services/alertService';

const ProdiForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    fakultas_id: '',
    foto: null,
  });
  const [fakultas, setFakultas] = useState([]);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    loadFakultas();
    if (isEdit) {
      loadProdi();
    }
  }, [id]);

  const loadFakultas = async () => {
    try {
      const response = await fakultasService.getAll();
      setFakultas(response.data.data);
    } catch (error) {
      console.error('Error loading fakultas:', error);
      AlertService.error('Error', 'Failed to load faculties');
    }
  };

  const loadProdi = async () => {
    try {
      const response = await prodiService.getById(id);
      const prodi = response.data.data;
      setFormData({
        nama: prodi.nama,
        fakultas_id: prodi.fakultas_id,
        foto: null,
      });
      if (prodi.foto_url) {
        setPreview(prodi.foto_url);
      }
    } catch (error) {
      setError('Failed to load program studi');
      console.error('Error loading prodi:', error);
      AlertService.error('Error', 'Failed to load program data');
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
        await prodiService.update(id, formData);
        AlertService.success('Updated!', 'Program has been updated successfully.');
      } else {
        await prodiService.create(formData);
        AlertService.success('Created!', 'New program has been created successfully.');
      }
      navigate('/prodis');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save program studi';
      setError(message);
      console.error('Error saving prodi:', error);
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
            {isEdit ? 'Edit Program Studi' : 'Create New Program Studi'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Update study program information' : 'Add a new study program to the university'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Program Studi */}
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
              Study Program Name *
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
              placeholder="Enter study program name"
            />
          </div>

          {/* Fakultas Selection */}
          <div>
            <label htmlFor="fakultas_id" className="block text-sm font-medium text-gray-700 mb-2">
              Faculty *
            </label>
            <select
              id="fakultas_id"
              name="fakultas_id"
              value={formData.fakultas_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            >
              <option value="">Select Faculty</option>
              {fakultas.map((fakultasItem) => (
                <option key={fakultasItem.id} value={fakultasItem.id}>
                  {fakultasItem.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Foto Upload */}
          <div>
            <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-2">
              Program Photo
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
                isEdit ? 'Update Program' : 'Create Program'
              )}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/prodis')}
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

export default ProdiForm;