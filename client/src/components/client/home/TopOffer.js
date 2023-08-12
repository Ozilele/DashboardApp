import React, { memo } from 'react';
import image from '../../../img/some_1.png';
import { motion } from 'framer-motion';
import "./TopOffer.css";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const variant = {
  hidden: { opacity: 0, transform: "translateX(-100%)" },
  show: { opacity: 1, transform: "translateX(0%)" }
}

const TopOffer = ({ styleTransform, hotelName, localization, rating, features }) => {
  
  return (
    <motion.div 
      variants={variant}
      className='top-offer'>
      <div className='top-offer-img'>
        <img src={image} alt="xxxx"/>
      </div>
      <div className='top-offer-content'> 
        <div>
          <h3>{hotelName}</h3>
          <p>{localization.city}{", "} {localization.address}</p>
        </div>
        <div className='top-offer-rating'>
          <span>{rating}</span>
        </div>
      </div>
      <button style={{ padding: "0.45rem", fontSize: "1rem", color: 'white', border: 'none', cursor: 'pointer', backgroundColor: '#F29727', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} >
        <span>View Details</span>
        <TrendingFlatIcon/>
      </button>
    </motion.div>
  )
}

export default memo(TopOffer);