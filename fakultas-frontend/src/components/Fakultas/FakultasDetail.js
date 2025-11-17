// src/components/Fakultas/FakultasDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fakultasService } from '../../services/auth';
import { ContentLoader } from '../UI/Loading';

const FakultasDetail = () => {
  const [fakultas, setFakultas] = useState(null);
  const [prodis, setProdis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();

  useEffect(() => {
    loadFakultas();
    loadProdis();
  }, [id]);

  const loadFakultas = async () => {
    try {
      const response = await fakultasService.getById(id);
      setFakultas(response.data.data);
    } catch (error) {
      setError('Failed to load fakultas');
      console.error('Error loading fakultas:', error);
    }
  };

  const loadProdis = async () => {
    try {
      const response = await fakultasService.getProdis(id);
      setProdis(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load program studi');
      console.error('Error loading prodis:', error);
      setLoading(false);
    }
  };

  if (loading) return <ContentLoader />;
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center">
      {error}
    </div>
  );
  if (!fakultas) return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-xl text-center">
      Fakultas not found
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <nav className="flex text-sm text-gray-600 mb-2">
            <Link to="/fakultas" className="hover:text-blue-600 transition-colors">
              Fakultas
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{fakultas.nama}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{fakultas.nama}</h1>
        </div>
        <Link 
          to={`/fakultas/${id}/edit`}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit Fakultas</span>
        </Link>
      </div>

      {/* Faculty Detail Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          {fakultas.foto_url && (
            <div className="md:w-1/3">
              <img 
                src={fakultas.foto_url} 
                alt={fakultas.nama}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          
          {/* Content */}
          <div className={`p-8 ${fakultas.foto_url ? 'md:w-2/3' : 'w-full'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Faculty</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {fakultas.deskripsi || 'No description available for this faculty.'}
            </p>
            
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-blue-800 font-semibold">
                  {prodis.length} Program Studi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Studi Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Program Studi</h2>
            <p className="text-gray-600 mt-1">Study programs available in this faculty</p>
          </div>
          <Link 
            to="/prodis/create"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Prodi</span>
          </Link>
        </div>

        {prodis.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Program Studi</h3>
              <p className="text-gray-600 mb-4">No study programs found for this faculty</p>
              <Link 
                to="/prodis/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block"
              >
                Create Program Studi
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prodis.map((prodi) => (
              <div key={prodi.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                {prodi.foto_url && (
                  <img 
                    src={prodi.foto_url} 
                    alt={prodi.nama}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {prodi.nama}
                  </h3>
                  <Link 
                    to={`/prodis/${prodi.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FakultasDetail;