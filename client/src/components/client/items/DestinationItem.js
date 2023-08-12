import React from 'react';
import { motion } from 'framer-motion';
import image from '../../../img/some_1.png';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import './destination.css';

const DestinationItem = ({ id, city, country, count }) => {

  return (
    <div className='destination-item'>
      <div className='destination-item-img'>
        <img src={image} alt={id} />
      </div>
      <div className='destination-item-box'>
        <h3>{0}{id + 1}</h3>
        <div></div>
        <ThumbUpAltOutlinedIcon className='thumb-up-icon'/>
        <span>{count}</span>
      </div>
      <div className='destination-item-location'> 
        <h4>{country}</h4>
        <div>
          <CircleIcon className='circle-icon'/>
          <h5>{city}</h5>
        </div>
      </div>
    </div>
  )
}

export default DestinationItem;