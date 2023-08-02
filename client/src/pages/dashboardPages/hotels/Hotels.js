import React, { useState, useEffect, useCallback } from 'react'
import './Hotels.css';
import HotelCard from '../../../components/cards/HotelCard';
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Grid from '@mui/material/Grid';
import loader from '../../../img/loader.svg';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WaterIcon from '@mui/icons-material/Water';
import HikingIcon from '@mui/icons-material/Hiking';
import ClearIcon from '@mui/icons-material/Clear';
import Sort from "../../../components/sort/index.js";
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Pagination from '../../../components/pagination/Pagination';
import useHotelsRequest from '../../../hooks/useHotelsRequest';

const allCities = [
  "Krakow",
  "Warsaw",
  "Bangkok",
  "Karpacz",
  "Berlin",
  "Lizbona"
];

const Hotels = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filterNameToggled, setFilterNameToggled] = useState(false);
  const [city, setCity] = useState(""); // state for selecting city
  const [nameValInput, setNameValInput] = useState(""); // state for selecting name of hotel
  const [sortObj, setSortObj] = useState({ // state for sorting hotels by rating, stars, price
    sort: "stars",
    order: "desc"
  });
  const [appliedFeatures, setAppliedFeatures] = useState({});
  const { hotelsData, limitPages } = useHotelsRequest('/admin', setIsLoading, 6, page, nameValInput, city, appliedFeatures, sortObj);

  const filterToggle = useCallback((e) => {
    setFilterNameToggled(!filterNameToggled);
  }, [filterNameToggled]);

  const handleCityChange = useCallback((e) => { // prevent this function from rerendering unless city has changed
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("city", e.target.value);
      return params;
    });
    setCity(e.target.value);
  }, [city]);

  const handleNameChange = useCallback((e) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("search", e.target.value);
      return params;
    });
    setNameValInput(e.target.value);
  }, [nameValInput]);

  const onFeatureClick = useCallback((appliedFeature) => {
    setAppliedFeatures((prev) => {
      let newObj = { ...prev };
      if(Object.keys(prev).includes(appliedFeature)) {
        setSearchParams((prevParams) => {
          const params = new URLSearchParams(prevParams);
          params.delete(appliedFeature);
          return params;
        });
        delete newObj[appliedFeature];
      } else {
        setSearchParams((prevParams) => {
          const params = new URLSearchParams(prevParams);
          params.set(appliedFeature, "true");
          return params;
        });
        newObj[appliedFeature] = true;
      }
      return newObj;
    });
  }, [appliedFeatures]);

  useEffect(() => {
    // When some function is recreated(changing city, name, applying feature page is 1 in default)
    setPage(1);
  }, [handleCityChange, handleNameChange, onFeatureClick]);

  return (
    <div className="hotels__section">
      <div className="hotels__top">
        <h2>All Hotels</h2>
        <Link to="./newHotel" className='new-hotel-link'>
          <button className='add-hotel-btn'>
            <AddIcon/>
            <span>Add Hotel</span>
          </button>
        </Link>
      </div>
      <div onClick={filterToggle} className={filterNameToggled ? "hotels_name_filter_wide" : "hotels_name_filter"}>
        <SearchOutlinedIcon className='search_icon'/>
        <input value={nameValInput} onChange={handleNameChange} placeholder={filterNameToggled ? "Hotel name" : ""} className="hotels_name_input" type="text"></input>
      </div>
      <div className="hotels_filters">
        <div className="location_filter">
          <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="City"
                onChange={handleCityChange}
              >
              {allCities.map((city, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={city}>
                    {city}
                  </MenuItem>
                )
              })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <Sort sort={sortObj} setSort={setSortObj}/>
        <div className='icons_filter'>
          <IconButton style={{backgroundColor: Object.keys(appliedFeatures).includes("closeToSee") ? "cornflowerblue" : "white" }} onClick={(e) => onFeatureClick("closeToSee")} name="see" className='see-btn-feature'><WaterIcon/></IconButton>
          <IconButton style={{backgroundColor: Object.keys(appliedFeatures).includes("closeToMountains") ? "cornflowerblue" : "white" }} onClick={(e) => onFeatureClick("closeToMountains")} name="mountains"><HikingIcon/></IconButton>
          <IconButton style={{backgroundColor: Object.keys(appliedFeatures).includes("hasParking") ? "cornflowerblue" : "white" }} onClick={(e) => onFeatureClick("hasParking")} name="parking"><LocalParkingIcon/></IconButton>
        </div>
        <button onClick={(e) => { 
          setCity("");
          setNameValInput("");
          setSortObj({ sort: "stars", order: "desc"});
          setAppliedFeatures({});
          setSearchParams({});
         }} className="clear__filter-btn">
          <ClearIcon className='clear-icon'/>
          <span>Clear Filters</span>
        </button>
      </div>
      {isLoading && <img className='loader_img' src={loader} alt="Loader_hotel"/>}
      {!isLoading && <Grid style={{ marginBottom: '2.5rem'}} container rowSpacing={{xl: 2, lg: 2, md: 2, sm: 4, xs: 8}} columnSpacing={{xl: 1, lg: 2, md: 3, sm: 2}}>
        {hotelsData.map((hotel => {
          return (
            <AnimatePresence key={hotel._id}>
              <Grid 
                initial={{ y: "20px", opacity: 0.5 }} 
                animate={{ y: '0px', opacity: 1 }} 
                exit={{ y: "-20px", opacity: 0 }}
                transition={{ type: 'tween', stiffness: 100 }} 
                component={motion.div} 
                item key={hotel._id} 
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} 
                whileTap={{ scale: 0.95 }} 
                className="hotels_grid-item" 
                xl={3} lg={3} md={4} sm={6} xs={12}>
                  <HotelCard id={hotel._id} name={hotel.name} localization={hotel.localization} stars={hotel.stars} imgSrc={hotel?.hotelImage} base64String={hotel?.image?.img?.data?.data}/>
                  {/* makeRequest={makeRequest} */}
              </Grid>
            </AnimatePresence>
          )
        }))}
      </Grid>}
      {!isLoading && <Pagination 
        totalPages={limitPages}
        page={page}
        setPage={setPage}
      />}
    </div>
  )  
}

export default Hotels;
