import { useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios"; 
import useRefreshToken from "./useRefreshToken";
import { useEffect } from 'react';
import { selectAuth } from "../features/auth/authSlice";

// Hook which intercepts requests or responses before they are handled by then or catch
const useAxiosPrivate = () => {
  const { refresh } = useRefreshToken(); // hook for refreshing accessToken using refreshToken
  const { user, isError, isSuccess, isLoading, message } = useSelector(selectAuth);
  
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      config => {
        if(!config.headers['Authorization']) { // first attempt to attach a header to request
          config.headers['Authorization'] = `Bearer ${user?.accessToken}`
        }
        return config;
      }, 
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      response => response, // if accessToken is still valid(did not expire)
      async (error) => { // if accessToken has expired, use refresh token to issue new access token and retry the request
        const prevRequest = error?.config;
        if(error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const msg = await refresh();
          if(msg?.response?.status === 401 || msg?.response?.status === 403) { // Unable to get new accessToken
            return Promise.reject(msg);
          }
          prevRequest.headers['Authorization'] = `Bearer ${msg}`;
          return axiosPrivate(prevRequest); // Retrying request with given new accessToken
        }
        return Promise.reject(error);
      } 
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    }
  }, [user, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;