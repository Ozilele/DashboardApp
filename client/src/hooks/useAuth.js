import { useEffect, useState, memo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = (role = null) => {

  const [authObject, setAuthObject] = useState({
    accessToken: null,
    role: null
  });
  const [isAuthLoading, setIsLoading] = useState(true);
  // const [isAuthorized, setIsAuthorized] = useState(false);

  return {
    authObject,
    setAuthObject,
    isAuthLoading,
    setIsLoading
  }
}

export default useAuth;
  // useEffect(() => {
  //   const { accessToken } = Cookies.get();
  //   if(!accessToken) {
  //     setIsLoading(false);
  //     setIsAuthorized(false);
  //   } else {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     }
  //     axios
  //       .get("http://localhost:8000/auth/user", config)
  //       .then(res => {
  //         console.log(res);
  //         if(res?.data?.message === "authorized" && res?.data?.userRole === role) {
  //           setIsAuthorized(true);
  //         } else {
  //           setIsAuthorized(false);
  //         }
  //         setIsLoading(false);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         setIsLoading(false);
  //         setIsAuthorized(false);
  //     });
  //   }
  // }, []);

  // return {
  //   isAuthorized,
  //   isLoading
  // }

