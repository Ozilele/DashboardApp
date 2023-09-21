import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import './SingleHotel.css';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import axios from 'axios';
import BookIcon from '@mui/icons-material/Book';
import ReviewsWindow from '../../../components/windows/ReviewsWindow';
import Cookies from 'js-cookie';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import useFavoriteHotel from '../../../hooks/useFavoriteHotel';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/auth/authSlice';
import { URL_origin } from '../../../utils/helpers';
import { selectModal, toggleModalWindow } from '../../../features/appSlice';
import useImageLoaded from '../../../hooks/useImageLoaded';

const SingleHotel = () => {

  const user = useSelector(selectUser);
  const isModalShown = useSelector(selectModal);
  const dispatch = useDispatch();

  const [hotel, setHotelData] = useState({});
  const params = useParams();
  const hotelID = useMemo(() => {
    return params?.id;
  }, [params]); 

  const { isFavorite, toggleFavorite } = useFavoriteHotel({
    hotelId: hotelID,
    userId: user?._id
  });

  const { ref, onLoad, loaded } = useImageLoaded();

  const stars = Array.from({ length: hotel.stars }, (_, index) => index);

  useEffect(() => {
    axios.get(`${URL_origin}/api/client/hotel/${hotelID}`)
      .then((res) => {
        if(res.status === 201) {
          const hotelData = res.data.hotel[0];
          const splitImgSrc = hotelData?.hotelImage.split(".")
          setHotelData({
            country: hotelData.country,
            name: hotelData.name,
            localization: hotelData.localization,
            stars: hotelData.stars,
            rating: hotelData.rating,
            imageSrc: hotelData.hotelImage,
            blurredImgSrc: splitImgSrc ? `${splitImgSrc[0]}_blurred.${splitImgSrc[1]}` : "",
            features: hotelData.features,
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const handlePaymentCheckout = useCallback(async (e) => {
    const { accessToken } = Cookies.get();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const response = await axios.post(`${URL_origin}/api/client/checkout?price=price_1NZ0tnJ1TgaWBK1fzlqTSrWD`, {
      data: 'Test data'
    }, config);
    if(response.data.url) {
      window.location.assign(response.data.url); // Forward user to the Stripe Checkout
    }
  }, []);

  return (
    <>
      <div className="singleHotelPage">
        <div className="singleHotelPageImg">
          <div className='singleHotel-firstSec-container'>
            <div className='singleHotel-firstSec-start'>
              <h2>{hotel?.name}</h2>
              <div className='singleHotel-localization'>
                <LocationOnIcon style={{ color: 'black' }}/>
                <span>{hotel?.localization?.city}{", "}{hotel?.localization?.address}{", "}</span>
                <span>{" "}{hotel?.country}</span>
              </div>
            </div>
            <div className="singleHotel-firstSec-end">
              <h3>{hotel?.rating}</h3>
            </div>
          </div>
          <div 
            className='image-container' 
            style={{ backgroundImage: `url('http://localhost:8000/uploads/hotels/${hotel?.blurredImgSrc}')`}}>
            <img 
              ref={ref} 
              style={{ opacity: loaded ? 1 : 0 }}
              loading='lazy'
              onLoad={onLoad} 
              src={`http://localhost:8000/uploads/hotels/${hotel?.imageSrc}`} 
              alt={hotelID}
            />
            <IconButton onClick={toggleFavorite} className='hotel-favorite-btn'>
              {isFavorite && <Favorite style={{ color: 'red' }}/>}
              {!isFavorite && <FavoriteBorder className='favorite-border-btn'/>}
            </IconButton>   
          </div>
        </div>
        <div className="singleHotelContainer">
          <div className="singleHotelTop">
            <div className="singleHotelRow">
              <span>Stars:</span>
              <Typography>
                {stars.map(i => {
                  return <span style={{width: '22px', marginRight: "3px"}} key={i}>⭐️</span>
                })}
              </Typography>
            </div>
            <div className='singleHotelRowEnd'>
              <button onClick={handlePaymentCheckout} className='book-hotel-now-btn'>
                <BookIcon/>
                <span>Book Now</span>
              </button>
            </div>
          </div>
          <div className="single-Hotel-Features">
            {hotel?.features?.closeToSee && (<div>
              <WaterIcon style={{ background: "#4477CE" }}/>
              <span>Close to See</span>
            </div>)}
            {hotel?.features?.closeToMountains && (<div>
              <LandscapeIcon style={{ background: "#765827" }} />
              <span>Mountains</span>
            </div>)}
            {hotel?.features?.closeToMountains && (<div>
              <LocalParkingIcon style={{ background: "#272829" }} />
              <span>Parking</span>
            </div>)}
          </div>
          <div className='single-Hotel-Desc'>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          </div>
          <div className='single-Hotel-Bottom'>
            <button onClick={(e) => dispatch(toggleModalWindow())} >
              <ReviewsOutlinedIcon/>
              <span>See Reviews</span>
            </button>
          </div>
        </div>
      </div>
      {isModalShown && <ReviewsWindow hotelId={hotelID} hotelName={hotel.name} localization={hotel.localization}/>}
    </>
  )
}

export default memo(SingleHotel);