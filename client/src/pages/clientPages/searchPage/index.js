import React, { memo, useState, useEffect } from 'react';
import './ClientHotels.css';
import axios from 'axios';
import './index.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Autocomplete from '@mui/material/Autocomplete';
import TuneIcon from '@mui/icons-material/Tune';
import SearchRow from '../../../components/searchResults/index.js';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import loader from "../../../img/loader.svg";
import hotelImg from '../../../img/someHotel.jpg';
import { Link } from 'react-router-dom';
import { countriesOptions } from '../../../utils/helpers';
import Sort from '../../../components/sort';
import { Box, Icon, IconButton, TextField } from '@mui/material';
import SearchHotelSidebar from '../../../components/client/SearchHotelSidebar';

const initialSortObj = {
  sort: "stars",
  order: "asc"
}

const ClientSearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarShown, setSidebarShown] = useState(false);
  const [page, setPage] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [inputs, setInputs] = useState({
    hotel_name: "",
    destination: "",
    check_in_out_date: "",
    min_price: 0,
    max_price: 0,
    adult: 1,
    children: 1,
    room: 1,
    min_rating: '',
  });
  const [features, setFeatures] = useState({
    "closeToSee": false,
    "closeToMountains": false,
    "hasParking": false,
  });
  const [sortObj, setSortObj] = useState(initialSortObj);

  useEffect(() => {
    setIsLoading(true);
    const API_URL = `/api/client/hotels?limit=${15}&page=${page}&search=${inputs.hotel_name}&closeToSee=${features["closeToSee"]}&closeToMountains=${features["closeToMountains"]}&hasParking=${features["hasParking"]}&sort=${sortObj.sort},${sortObj.order}`;
    axios.get(API_URL)
      .then(res => {
        setIsLoading(false);
        console.log(res);
        if(res.status === 200) {
          setHotels(res.data.hotels);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [page, inputs.hotel_name, features, sortObj]);

  const handleInputChange = (e) => {
    setInputs(prev=> ({
      ...prev,
      [e.target.name]: e.target.value // selected input change
    }));
  }

  return (
    <div className="client-search-page">
      <div className='client-page-filters'>
        <div className='client-page-input'>
          <SearchOutlinedIcon className='client-page-search-icon'/>
          <input 
            value={inputs.hotel_name}
            onChange={handleInputChange}
            placeholder='Search...' 
            type='text' 
            name="hotel_name"/>
        </div>
        <div className='filters-row'>
          <div className='moreFilters-section'>
            <IconButton onClick={(e) => setSidebarShown(!isSidebarShown)} className='moreFilters-btn'>
              <TuneIcon/>
              <span>More Filters</span>
              <KeyboardArrowLeftIcon/>
            </IconButton>
          </div>
          <Autocomplete
            id="country"
            options={countriesOptions}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password'
                }}
              />
            )}
          />
          <Sort isClient={true} sort={sortObj} setSort={setSortObj}/>
        </div>
      </div>
      <div className='client-page-results'>
        <div style={{ marginBottom: '1.75rem' }} className='popular-filters-sm'>
          <IconButton style={{ backgroundColor: '#001dff', borderRadius: '8px', color: 'whitesmoke', fontSize: '1.1rem' }}>
            <MoreVertIcon/>
            <span>Popular Filters</span>
          </IconButton>
        </div>
        <div className='filters-client'>
          <h4>Current filters</h4>
          <div className='client-current-filters'>
            <button>Close to see</button>
            <button>Close to see</button>
            <button>Close to see</button>
            <button>Close to see</button>
            <button>Close to see</button>
          </div>
          <div className='client-popular-filters'>
            <h4>Popular filters</h4>
            <div className='client-popular-filter'>
              <label htmlFor="">Beautiful views</label>
              <input type="checkbox"/>
            </div>
            <div className='client-popular-filter'>
              <label htmlFor="">Restaurant</label>
              <input type="checkbox"/>
            </div>
            <div className='client-popular-filter'>
              <label htmlFor="">Free Wifi </label>
              <input type="checkbox"/>
            </div>
            <div className='client-popular-filter'>
              <label htmlFor="">Room service</label>
              <input type="checkbox"/>
            </div>
            <div className='client-popular-filter'>
              <label htmlFor="">Air conditioning</label>
              <input type="checkbox"/>
            </div>
            <div className='client-popular-filter'>
              <label htmlFor="">Balcony</label>
              <input type="checkbox"/>
            </div>
            <div className='client-popular-filter'>
              <label htmlFor="">Gym access</label>
              <input type="checkbox"/>
            </div>
          </div>
        </div>
        <div className='client-hotels-results'>
          {isLoading && <img className='loader_img' src={loader} alt="Loader_hotel"/>}
          {!isLoading && hotels.map((hotel) => {
            return (
              <SearchRow
                key={hotel._id}
                id={hotel._id}
                name={hotel.name}
                features={hotel.features}
                country={hotel.country}
                localization={hotel.localization}
                stars={hotel.stars} 
                imgSrc={hotel?.hotelImage} 
                base64String={hotel?.image?.img?.data?.data}
              />
            )
          })}
        </div>
      </div>
      <SearchHotelSidebar 
        features={features} 
        isSidebarShown={isSidebarShown}
        setSidebar={setSidebarShown}
        setFeatures={setFeatures}/>
    </div>
  )
}

export default memo(ClientSearchPage);