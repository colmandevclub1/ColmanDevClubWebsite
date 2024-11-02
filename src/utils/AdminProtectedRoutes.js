import React from 'react';
import { Navigate } from 'react-router-dom';
import { roles } from 'src/constants/roles.js';
import { auth } from 'src/config/firebase-config.js';

const AdminProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

  const isAdmin = user?.role === roles.admin;

  if (!user) return <Navigate to="/signin" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminProtectedRoute;
