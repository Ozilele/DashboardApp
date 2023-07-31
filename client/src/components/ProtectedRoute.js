import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const { accessToken } = Cookies.get();
    if(!accessToken) {
      setIsAuthorized(false);
      setIsLoading(false);
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      axios
        .get("/auth/admin_user", config)
        .then(res => {
          if(res.data.message === "authorized") {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsAuthorized(false);
          setIsLoading(false);
      });
    }
  }, []);

  if(isLoading) {
    return <div>Loading...</div>
  }
  else if(!isAuthorized) {
    return <Navigate to='/'/>;
  } else {
    return children ? children : <Outlet/>;
  }
}

export default ProtectedRoute;