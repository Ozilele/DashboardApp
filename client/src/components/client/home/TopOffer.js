import React, { memo } from 'react';
import image from '../../../img/some_1.png';
import "./TopOffer.css";

const TopOffer = ({ hotelName, localization, rating, features }) => {

  return (
    <div className='top-offer'>
      <div className='top-offer-img'>
        <img src={image} alt="xxxx"/>
      </div>
      <div className='top-offer-content'> 
        <div>
          <h3>{hotelName}</h3>
          <p>{localization.city} {" "} {localization.address}</p>
        </div>
        <div>
          <span>{rating}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(TopOffer);