// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import FakultasList from './components/Fakultas/FakultasList';
import FakultasForm from './components/Fakultas/FakultasForm';
import FakultasDetail from './components/Fakultas/FakultasDetail';
import ProdiList from './components/Prodi/ProdiList';
import ProdiForm from './components/Prodi/ProdiForm';
import ProdiDetail from './components/Prodi/ProdiDetail';

// Protected and Public Route components...

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* React Hot Toast Container */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
            },
          }}
        />
        
        <Layout>
          <Routes>
            {/* Your routes */}
            <Route path="/" element={<Navigate to="/fakultas" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fakultas" element={<FakultasList />} />
            <Route path="/fakultas/create" element={<FakultasForm />} />
            <Route path="/fakultas/:id" element={<FakultasDetail />} />
            <Route path="/fakultas/:id/edit" element={<FakultasForm />} />
            <Route path="/prodis" element={<ProdiList />} />
            <Route path="/prodis/create" element={<ProdiForm />} />
            <Route path="/prodis/:id" element={<ProdiDetail />} />
            <Route path="/prodis/:id/edit" element={<ProdiForm />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;