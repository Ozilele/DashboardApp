import React, { memo, useState } from 'react';
import './TopOffers.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import TopOffer from './TopOffer';

const offers = [
  {
    hotelName: "Mariott",
    localization: {
      city: "Warsaw",
      address: "Aleje Jerozolimskie 12/a"
    },
    rating: 8.32,
    features: {},
  },
  {
    hotelName: "Miami",
    localization: {
      city: "Warsaw",
      address: "Muszyńska 12/a"
    },
    rating: 6.2,
    features: {},
  },
]

const TopOffers = () => {

  // const [offers, setOffers] = useState([]);

  return (
    <div className='top-offers'>
      <h3>Top Offers</h3>
      <div className='top-offers-content'>
        <div className='top-offers-left'>
          <IconButton>
            <KeyboardArrowLeftIcon/>
          </IconButton>
        </div>
        <div className="top-offers-results"> 
          {offers.map((offer) => {
            return (
              <TopOffer 
                hotelName={offer.hotelName}
                localization={offer.localization}
                rating={offer.rating}
                features={offer.features}
              />
            )
          })}
        </div>
        <div className='top-offers-right'>
          <IconButton>
            <KeyboardArrowRightIcon/>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default memo(TopOffers);