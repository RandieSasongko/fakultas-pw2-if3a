// src/components/Prodi/ProdiDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { prodiService } from '../../services/auth';
import { ContentLoader } from '../UI/Loading';

const ProdiDetail = () => {
  const [prodi, setProdi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();

  useEffect(() => {
    loadProdi();
  }, [id]);

  const loadProdi = async () => {
    try {
      const response = await prodiService.getById(id);
      setProdi(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load program studi');
      console.error('Error loading prodi:', error);
      setLoading(false);
    }
  };

  if (loading) return <ContentLoader />;
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center">
      {error}
    </div>
  );
  if (!prodi) return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-xl text-center">
      Program studi not found
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <nav className="flex text-sm text-gray-600 mb-2">
            <Link to="/prodis" className="hover:text-blue-600 transition-colors">
              Program Studi
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{prodi.nama}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{prodi.nama}</h1>
        </div>
        <Link 
          to={`/prodis/${id}/edit`}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit Program Studi</span>
        </Link>
      </div>

      {/* Program Studi Detail Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          {prodi.foto_url && (
            <div className="md:w-1/3">
              <img 
                src={prodi.foto_url} 
                alt={prodi.nama}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          
          {/* Content */}
          <div className={`p-8 ${prodi.foto_url ? 'md:w-2/3' : 'w-full'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Studi Details</h2>
            
            <div className="space-y-4">
              {/* Faculty Information dengan Optional Chaining */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Faculty</p>
                  {prodi.fakultas ? (
                    <Link 
                      to={`/fakultas/${prodi.fakultas.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      {prodi.fakultas.nama}
                    </Link>
                  ) : (
                    <span className="text-gray-500 italic">No faculty assigned</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created Date</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(prodi.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {prodi.updated_at && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(prodi.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center">
        <Link 
          to="/prodis"
          className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Program Studi List</span>
        </Link>
      </div>
    </div>
  );
};

export default ProdiDetail;