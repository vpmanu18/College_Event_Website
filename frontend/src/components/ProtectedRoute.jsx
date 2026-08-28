import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}>
        <div className="skeleton" style={{ width: '80px', height: '80px', borderRadius: '50%' }}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and save the state location to return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
