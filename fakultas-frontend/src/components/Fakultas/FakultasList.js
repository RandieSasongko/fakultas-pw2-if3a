// src/components/Fakultas/FakultasList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fakultasService } from '../../services/auth';
import { ContentLoader } from '../UI/Loading';
import AlertService from '../../services/alertService';

const FakultasList = () => {
  const [fakultas, setFakultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFakultas();
  }, []);

  const loadFakultas = async () => {
    try {
      const response = await fakultasService.getAll();
      setFakultas(response.data.data);
    } catch (error) {
      setError('Failed to load fakultas');
      console.error('Error loading fakultas:', error);
      AlertService.error('Error', 'Failed to load faculties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nama) => {
    const result = await AlertService.deleteConfirm(`faculty "${nama}"`);
    
    if (result.isConfirmed) {
      try {
        await fakultasService.delete(id);
        setFakultas(fakultas.filter(f => f.id !== id));
        AlertService.success('Deleted!', `Faculty "${nama}" has been deleted.`);
      } catch (error) {
        console.error('Error deleting fakultas:', error);
        AlertService.error('Error', 'Failed to delete faculty');
      }
    }
  };

  if (loading) return <ContentLoader />;
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center">
      {error}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fakultas</h1>
          <p className="text-gray-600 mt-2">Manage all faculties in the university</p>
        </div>
        <Link 
          to="/fakultas/create"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Fakultas</span>
        </Link>
      </div>

      {/* Fakultas Grid */}
      {fakultas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fakultas.map((fakultasItem) => (
            <div key={fakultasItem.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Image */}
              {fakultasItem.foto_url && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={fakultasItem.foto_url} 
                    alt={fakultasItem.nama}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {fakultasItem.nama}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {fakultasItem.deskripsi || 'No description available'}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {fakultasItem.prodis?.length || 0} Program Studi
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link 
                    to={`/fakultas/${fakultasItem.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                  >
                    View
                  </Link>
                  <Link 
                    to={`/fakultas/${fakultasItem.id}/edit`}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(fakultasItem.id, fakultasItem.nama)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Fakultas Found</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first faculty</p>
            <Link 
              to="/fakultas/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block"
            >
              Create Fakultas
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FakultasList;