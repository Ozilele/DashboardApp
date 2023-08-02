import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {

  const { isAuthorized, isLoading } = useAuth("admin");
  const location = useLocation();

  if(!isAuthorized && !isLoading) {
    return <Navigate to='/' state={{ from: location }} replace />;
  } else if(isAuthorized && !isLoading) {
    return children ? children : <Outlet/>;
  }
}

export default ProtectedRoute;