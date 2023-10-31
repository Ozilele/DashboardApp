import { useState, useEffect } from 'react';
import axios from 'axios';

const useHotelsRequest = (endpoint, limit, page, search, city = "", features, sortObj) => {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState([]); // hotels data for admin and user
  const [limitPages, setLimitPages] = useState(1); // limit pages(max number of pages)

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const API_URL = `${endpoint}/hotels?limit=${limit}&page=${page}&search=${search}&city=${city}&closeToSee=${features["closeToSee"]}&closeToMountains=${features["closeToMountains"]}&hasParking=${features["hasParking"]}&sort=${sortObj.sort},${sortObj.order}`;
    axios.get(API_URL, {
      signal: controller.signal
    })
    .then(res => {
      console.log(res);
      if(res.status === 200) {
        setHotelsData(res.data.hotels);
        setLimitPages(Math.ceil((res.data.allDocuments / res.data.limit)));
      }
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      const errTimeout = 10000;
      setTimeout(() => {
        setIsLoading(false);
        const errorObj = {
          status: err?.response?.status,
          statusText: err?.response?.statusText,
        }
        setError(errorObj);
      }, errTimeout);
    });
    return () => controller.abort();
  }, [page, search, city, features, sortObj]);

  return {
    hotelsData,
    limitPages,
    isLoading,
    error,
  }
}

export default useHotelsRequest;