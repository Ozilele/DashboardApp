import React, { memo, useState} from 'react';
import './sidebar_index.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Icon, IconButton, Slide } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WaterIcon from '@mui/icons-material/Water';
import TerrainIcon from '@mui/icons-material/Terrain';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import AccomodationInput from '../../inputs/AccomodationInput';

const icons = [WaterIcon, TerrainIcon, LocalParkingIcon];

const variants = {
  hidden: { opacity: 0, transform: 'translateX(-100%)' },
  show: {
    opacity: 1,
    transform: 'translateX(0%)',
    transition: {
      staggerChildren: 1,
    }
  }
}

function valuetext(value) {
  return `${value}zł`;
}

const accomodationRows = ["adults", "children", "rooms", "days"];

const marks = [
  {
    value: 70,
    label: '70zł',
  },
  {
    value: 250,
    label: '250zł',
  },
  {
    value: 500,
    label: '500zł',
  },
  {
    value: 1000,
    label: '1000zł'
  }
]

const SearchHotelSidebar = ({ features, isSidebarShown, setSidebar, setFeatures }) => {

  const [stars, setStars] = useState(5);
  const [priceSliderValue, setPriceSlider] = useState(1000);
  const [ratingSliderValue, setRatingSlider] = useState([0.0, 10.0]);
  const [inputs, setInputs] = useState({
    adults: 0,
    children: 0,
    rooms: 0,
    days: 0,
  });

  const handleChange = (e, feature) => {
    setFeatures((prev) => {
      return {
        ...prev,
        [feature]: !features[feature]
      }
    });
  }

  const handleSliderChange = (event, newValue) => {
    setPriceSlider(newValue);
  }

  const handleRatingSliderChange = (event, newValue) => {
    setRatingSlider(newValue);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const valueReplaced = value.replace(/[^0-9]/g, '');
    setInputs((prev) => {
      return {
        ...prev,
        [name]: valueReplaced,
      }
    }); 
  }

  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      animate={isSidebarShown ? "show" : ""}  
      className='search-hotel-sidebar'>
      <IconButton onClick={() => setSidebar(false)} className='delete-search-sidebar-btn' aria-label='close'>
        <CloseIcon/>
      </IconButton>
      <div className='features'>
        <h3>Features</h3>
        {Object.keys(features).map((feature, i) => (
            <FormControlLabel
              key={i}
              style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', marginLeft: '0', marginRight: '0'}}
              control={
              <Switch onChange={(e) => handleChange(e, feature)} inputProps={{ 'aria-label': 'controlled' }} checked={features[feature]} name={feature}/>
              }
            label={
              <div style={{display: 'flex', alignItems: 'center'}}>
                {React.createElement(icons[i], { style: { marginRight: '4px' } })}
                {feature}
              </div>
            }
            labelPlacement='start'
            >
              {features[feature] ? <Icon style={{ marginRight: '5px' }}><LocalParkingIcon /></Icon> : null}
            </FormControlLabel>
        ))}
      </div>
      <div className='accomodation-sidebar'>
        <h3>Accomodation</h3>
        {accomodationRows.map((row, i) => {
          return (
            <AccomodationInput
              key={i}
              rowName={row}
              inputs={inputs}
              handleInputChange={handleInputChange}
            />
          )
        })}
      </div>
      <div className='search-sidebar-price'>
        <h3>Price</h3>
        <Slider 
          sx={{ margin: '0' }}
          min={70}
          max={1000}
          value={priceSliderValue}
          onChange={handleSliderChange}
          getAriaValueText={valuetext}
          step={20}
          marks={marks}
          valueLabelDisplay="on"
        />
      </div>
      <div className='search-sidebar-stars'>
        <h3>Stars</h3>
        <Rating
          name="simple-controlled"
          precision={0.25}
          value={stars}
          onChange={(event, newValue) => setStars(newValue)}
        />
      </div>
      <div className='search-sidebar-rating'>
        <h3>Rating</h3>
        <Slider
          sx={{ margin: '0' }}
          min={0.0}
          max={10.0}
          value={ratingSliderValue}
          onChange={handleRatingSliderChange}
          step={0.25}
          valueLabelDisplay='on'
        />
      </div>
      <div className='sidebar-search-btn'>
        <button className='sidebar-search-apply'>Apply</button>
      </div>
    </motion.div>
  )
}

export default memo(SearchHotelSidebar);