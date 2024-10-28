import React from 'react';
import { Navigate } from 'react-router-dom';
import { roles } from 'src/constants/roles.js';
import { UserAuth } from 'src/lib/auth/authContext';

const AdminProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  console.log(user);
  const isAdmin = user?.role === roles.admin;

  if (!user) return <Navigate to="/signin" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminProtectedRoute;
