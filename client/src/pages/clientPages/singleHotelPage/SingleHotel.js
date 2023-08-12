import React, { useEffect, useState } from 'react';
import './SingleHotel.css';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WaterIcon from '@mui/icons-material/Water';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import axios from 'axios';
import BookIcon from '@mui/icons-material/Book';
import ReviewsWindow from '../../../components/windows/ReviewsWindow';
import Cookies from 'js-cookie';
import { IconButton } from '@mui/material';

const SingleHotel = () => {
  const [hotel, setHotelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showReviews, setReviews] = useState(false);

  const params = useParams();
  const hotelID = params?.id;
  const stars = Array.from({ length: hotel.stars }, (_, index) => index);

  useEffect(() => {
    axios.get(`/api/client/hotel/${hotelID}`)
      .then((res) => {
        if(res.status === 201) {
          const hotelData = res.data.hotel[0];
          setHotelData({
            country: hotelData.country,
            name: hotelData.name,
            localization: hotelData.localization,
            stars: hotelData.stars,
            imageSrc: hotelData.hotelImage,
            features: hotelData.features,
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const handlePaymentCheckout = async (e) => {
    const { accessToken } = Cookies.get();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const response = await axios.post(`/api/client/checkout?price=price_1NZ0tnJ1TgaWBK1fzlqTSrWD`, {
      data: 'Test data'
    }, config);
    if(response.data.url) {
      window.location.assign(response.data.url); // Forward user to the Stripe Checkout
    }
  }

  return (
    <>
      <div className="singleHotelPage">
        <div className="singleHotelPageImg">
          <div className='singleHotel-firstSec'>
            <Typography>
              {stars.map(i => {
                return <span style={{width: '22px', marginRight: "3px"}} key={i}>⭐️</span>
              })}
            </Typography>
            <h2>{hotel?.name}</h2>
            <div className='singleHotel-rating'>
              <span>9.6</span>
            </div>
          </div>
          <img src={`http://localhost:8000/uploads/hotels/${hotel?.imageSrc}`} alt={hotelID}></img>
        </div>
        <div className="singleHotelContainer">
          <div className="singleHotelTop">
            <div className="singleHotelRow">
              <LocationOnIcon/>
              <span>{hotel?.localization?.city}{", "}{hotel?.localization?.address}{", "}</span>
              <span>{hotel?.country}</span>
            </div>
            <div className='singleHotelRowEnd'>
              <IconButton>
                <FavoriteIcon/>
              </IconButton>
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
            {/* Mapa Google Maps z lokalizacją hotelu */}
            <button onClick={(e) => setReviews(!showReviews)} >
              <ReviewsOutlinedIcon/>
              <span>See Reviews</span>
            </button>
          </div>
        </div>
      </div>
      {showReviews && <ReviewsWindow hotelId={hotelID} hotelName={hotel.name} localization={hotel.localization} setReviewsVisibility={() => setReviews(false)}/>}
    </>
  )
}

export default SingleHotel;