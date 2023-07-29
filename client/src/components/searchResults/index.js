import React, { memo } from 'react';
import { Typography } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
import TerrainIcon from '@mui/icons-material/Terrain';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './index.css';

const SearchRow = ({ id, name, features, country, localization, stars, imgSrc, base64String }) => {

  const base_64_string = btoa(
    new Uint8Array(base64String).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );  

  const stars_ = Array.from({ length: stars }, (_, index) => index);

  return (
    <motion.div 
      initial={{ opacity: 0, y: '20px', filter: 'blur(2px)' }}
      whileInView={{ opacity: 1, y: '0px', filter: 'blur(0)' }}
      margin="150px"
      viewport={{ once: true }}
      transition={{ type: 'spring', duration: 1.3, bounce: 0.25 }}
      className='client-row-hotel'
    >
      <div className='client-row-hotel-image'>
        <img src={base64String ? `data:image/jpeg;base64,${base_64_string}` : `http://localhost:8000/uploads/hotels/${imgSrc}`} alt={id}/>
      </div>
      <div className='client-row-hotel-data'>
        <div className='client-first-row'>
          <div>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/hotel/${id}`}>
              <h2 style={{ fontSize: '1.55rem' }}>{name}</h2>
            </Link>
            <Typography style={{ marginBottom: '10px' }}>
              {stars_.map(i => {
                return <span style={{width: '18px'}} key={i}>⭐️</span>
              })}
            </Typography>
          </div>
          <div className='client-row-rating'>
            <span>8.6</span>
          </div>
        </div>
        <div className='row-hotel-localization'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnOutlinedIcon style={{ width: '26px', height: '26px', color: 'grey'}}/>
            <h4 style={{ lineHeight: 1.7, fontFamily: 'serif', fontSize: '1.2rem' }}>{country}{", "}{localization.city}</h4>
          </div>
          <h5 style={{ paddingLeft: '0.2rem' }}>{localization.address}</h5>
        </div>
        <div className='row-hotel-features'>
          {features.closeToSee && <WaterIcon className='feature-water-icon'/>}
          {features.closeToMountains && <TerrainIcon className='feature-mountains-icon'/>}
          {features.hasParking && <LocalParkingIcon className='feature-parking-icon'/>}
          <Link style={{ textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }} to={`/hotel/${id}`}>
            <button className='hotel-feature-btn' style={{ marginLeft: 'auto' }}>Check Prices</button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(SearchRow);