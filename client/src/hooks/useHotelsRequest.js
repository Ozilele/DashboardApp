import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';

const useHotelsRequest = (endpoint, setIsLoading, limit, page, search, city = "", features, sortObj) => {

  const [hotelsData, setHotelsData] = useState([]); // hotels data for admin and user
  const [limitPages, setLimitPages] = useState(1); // limit pages(max number of pages)

  console.log(features);

  useEffect(() => {
    setIsLoading(true);
    const API_URL = `${endpoint}/hotels?limit=${limit}&page=${page}&search=${search}&city=${city}&closeToSee=${features["closeToSee"]}&closeToMountains=${features["closeToMountains"]}&hasParking=${features["hasParking"]}&sort=${sortObj.sort},${sortObj.order}`;
    axios.get(API_URL)
      .then(res => {
        setIsLoading(false);
        console.log(res);
        if(res.status === 200) {
          setHotelsData(res.data.hotels);
          setLimitPages(Math.ceil((res.data.allDocuments / res.data.limit)));
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [page, search, city, features, sortObj]);

  return {
    hotelsData,
    limitPages
  }
}

export default useHotelsRequest;