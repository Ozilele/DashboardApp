import { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { setCredentials } from "../features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  
  const refresh = useCallback(async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true
      });
      console.log(response);
      dispatch(setCredentials({
        accessToken: response.data.accessToken,
        role: response.data?.role,
        id: response.data?.id
      }));
      return response.data.accessToken;
    } catch(err) {
      console.log(err);
      return err;
    }
  }, []);

  return {
    refresh
  }
}

export default useRefreshToken;