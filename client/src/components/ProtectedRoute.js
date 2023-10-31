import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import useRefreshToken from '../hooks/useRefreshToken';

const ProtectedRoute = ({ children }) => {
  const [isNotAuthorized, setIsNotAuthorized] = useState(null);
  const { user, isError, isSuccess, isLoading, message } = useSelector(selectAuth);
  const { refresh } = useRefreshToken();
  const location = useLocation();

  useEffect(() => {
    const getNewAccessToken = async() => {
      if(!user) {
        const response = await refresh();
        if(response === 401 || response === 403) {
          setIsNotAuthorized(true);
        } else {
          setIsNotAuthorized(false);
        }
      }
    }
    if(!user) {
      getNewAccessToken();
    }
  }, []);

  if(isLoading) {
    return <div>Loading...</div>
  }
  if(isNotAuthorized && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }
  if((user?.role !== "admin" || !user?.role) && !isLoading && user?.accessToken) {
    return <Navigate to="/" state={{ from: location }} replace/>;
  } 
  if(user?.role === "admin" && !isLoading && user?.accessToken) {
    return children ? children : <Outlet/>;
  }
}

export default ProtectedRoute;