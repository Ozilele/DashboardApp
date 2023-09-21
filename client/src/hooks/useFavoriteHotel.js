import axios from "axios";
import Cookies from 'js-cookie';
import { URL_origin } from "../utils/helpers.js";
import { useCallback, useEffect, useState } from "react";

const useFavoriteHotel = ({ hotelId, userId = null }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { accessToken } = Cookies.get();

  useEffect(() => {
    if(userId === null) {
      return;
    }
    axios.get(`${URL_origin}/api/client/favorite?userId=${userId}&hotelId=${hotelId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(res.data.hotel) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }).catch(err => {
      console.log(err);
    }) 
  }, []);

  const toggleFavorite = useCallback(() => {
    if(userId == null) {
      return;
    }
    if(isFavorite) {
      axios.delete(`${URL_origin}/api/client/favorite/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => {
        console.log(res);
        if(res.status === 201) {
          setIsFavorite(false);
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      axios.post(`${URL_origin}/api/client/favorite`, {
        userId,
        hotelId
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => {
        console.log(res);
        if(res.status == 201) {
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