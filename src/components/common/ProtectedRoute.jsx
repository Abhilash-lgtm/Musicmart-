import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

/**
 * ProtectedRoute component for role-based route guarding.
 * Redirects unauthenticated users to /login and non-admins to / if admin is required.
 */
export const ProtectedRoute = ({ children, requireAdmin = false, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const isAdminRequired = requireAdmin || requiredRole === 'admin';

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner" />
        <p>Authenticating session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAdminRequired && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
