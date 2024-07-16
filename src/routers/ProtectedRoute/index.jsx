import React from 'react';
import useAuth from '../../customHooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ adminOnly }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
