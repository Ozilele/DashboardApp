import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate.js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice.js";

const useFavoriteHotel = ({ hotelId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector(selectUser);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log("UserID from useFavorite hook is", user?.id);
    if(user?.id === null) {
      return;
    }
    axiosPrivate.get(`/api/client/favorite/${hotelId}`)
    .then((res) => {
      if(res.data.hotel) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }).catch(err => {
      console.log(err);
      setIsFavorite(false);
    }); 
  }, [user]);

  const toggleFavorite = useCallback(() => {
    if(user.id == null) {
      return;
    }
    if(isFavorite) {
      axiosPrivate.delete(`/api/client/favorite/${hotelId}`)
      .then((res) => {
        console.log(res);
        if(res.status === 200) {
          setIsFavorite(false);
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      axiosPrivate.post(`/api/client/favorite`, {
        hotelId
      })
      .then((res) => {
        console.log(res);
        if(res.status == 200) {
          setIsFavorite(true);
        }
      }).catch(err => {
        console.log(err);
      });
    }    
  }, [isFavorite]);

  return {
    isFavorite,
    toggleFavorite
  }
}

export default useFavoriteHotel;