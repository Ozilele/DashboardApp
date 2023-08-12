import { useEffect, useState, memo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = (role) => {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { accessToken } = Cookies.get();
    if(!accessToken) {
      setIsLoading(false);
      setIsAuthorized(false);
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      axios
        .get("http://localhost:8000/auth/user", config)
        .then(res => {
          console.log(res);
          if(res?.data?.message === "authorized" && res?.data?.userRole === role) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setIsAuthorized(false);
      });
    }
  }, []);

  return {
    isAuthorized,
    isLoading
  }
}

export default useAuth;
