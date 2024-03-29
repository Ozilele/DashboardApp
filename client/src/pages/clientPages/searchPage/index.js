import React, { memo, useEffect, useState } from 'react';
import './index.css';
import Pagination from '../../../components/pagination/Pagination';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Autocomplete from '@mui/material/Autocomplete';
import TuneIcon from '@mui/icons-material/Tune';
import SearchRow from '../../../components/client/searchPage/searchRow.js';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import loader from "../../../img/hotels_client.svg";
import CloseIcon from '@mui/icons-material/Close';
import { countriesOptions } from '../../../utils/helpers';
import Sort from '../../../components/sort';
import { Box, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import SearchHotelSidebar from '../../../components/client/searchPage/SearchHotelSidebar';
import useHotelsRequest from "../../../hooks/useHotelsRequest.js";
import { applyFilter, deleteFilter, selectApp, toggleModalWindow, toggleSidebar } from '../../../features/appSlice';
import useUrlQueryString from '../../../hooks/useUrlQueryString';
import SearchPageWindow from '../../../components/windows/SearchPageWindow';

const initialSortObj = {
  sort: "stars",
  order: "asc"
}

const popularFilters = ["Beautiful views", "Restaurant", "Free Wifi", "Room service", "Air conditioning", "Balcony", "Gym access", "Boats", "Apartments", "Hotels"];

const ClientSearchPage = () => {
  const appState = useSelector(selectApp);
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(1);
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
  const { hotelsData, limitPages, isLoading, error } = useHotelsRequest('/api/client', 10, page, inputs.hotel_name, "", features, sortObj);
  const { currSortParam, currOrderParam, currFeaturesParam, setParams, deleteParams } = useUrlQueryString();

  useEffect(() => {
    // Loading url params for getting data specific for url
    if(currSortParam != initialSortObj.sort) {
      setSortObj((prev) => {
        return {
          ...prev,
          sort: currSortParam
        }
      });
    } 
    if(currOrderParam != initialSortObj.order) {
      setSortObj((prev) => {
        return {
          ...prev,
          order: currOrderParam
        }
      });
    }
    if(currFeaturesParam.length > 0) {
      currFeaturesParam.forEach((featureParam) => {
        dispatch(applyFilter(featureParam));
        setFeatures((prevFeatures) => ({
          ...prevFeatures,
          [featureParam]: true,
        }));
      });
    }
  }, []);

  const handleInputChange = (e) => {
    if(e.target.value === "") {
      deleteParams("hotel");
    } else {
      setParams("hotel", e.target.value);
    }
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
            <IconButton onClick={(e) => dispatch(toggleSidebar())} className='moreFilters-btn'>
              <TuneIcon/>
              <span className='more-filters-span-btn'>More Filters</span>
              <KeyboardArrowLeftIcon/>
            </IconButton>
          </div>
          <Autocomplete
            id="country"
            options={countriesOptions}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              setCountry(option.label);
              return (
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
              );
            }}
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
          <IconButton onClick={(e) => dispatch(toggleModalWindow())} className='popular-filters-sm-button'>
            <MoreVertIcon/>
            <span>Popular Filters</span>
          </IconButton>
        </div>
        <div className='filters-client'>
          <h4>Current filters</h4>
          <div className='client-current-filters'>
            {appState.appliedFilters.map((filter, i) => {
              return (
                <button key={i}>
                  <span>{filter}</span>
                  <CloseIcon onClick={(e) => {
                    deleteParams("features", filter);
                    dispatch(deleteFilter(filter));
                    setFeatures({
                      ...features,
                      [filter]: false
                    });
                  }}/>
                </button>  
              )
            })}
          </div>
          <div className='client-popular-filters'>
            <h4>Popular filters</h4>
            {popularFilters.map((filter, i) => (
              <div key={i} className='client-popular-filter'>
                <label htmlFor="">{filter}</label>
                <input type="checkbox"/>
              </div>
            ))}
          </div>
        </div>
        <div className='client-hotels-results'>
          {isLoading && <img className='client_hotels-loader' src={loader} alt="Loader_hotel"/>}
          {!isLoading && hotelsData?.map((hotel) => {
            return (
              <SearchRow
                key={hotel._id}
                id={hotel._id}
                name={hotel.name}
                features={hotel.features}
                country={hotel.country}
                localization={hotel.localization}
                stars={hotel.stars} 
                rating={hotel.rating}
                imgSrc={hotel?.hotelImage} 
                base64String={hotel?.image?.img?.data?.data}
              />
            )
          })}
          {(!isLoading && !error?.status) && <Pagination totalPages={limitPages} page={page} setPage={setPage} />}
          {(!isLoading && error?.status) && 
            <div className='not-found-err'>
              <h3>Unable to receive hotels data</h3>
              <p>{error?.status}{" "}{error?.statusText}</p>
            </div>
          }
        </div>
      </div>
      <SearchHotelSidebar 
        features={features} 
        setFeatures={setFeatures}
      />
      {appState.isModalOpen && <SearchPageWindow/>}
    </div>
  )
}

export default memo(ClientSearchPage);