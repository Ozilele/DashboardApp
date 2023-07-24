import React, { useState, useEffect } from 'react'
import './Hotels.css';
import HotelCard from '../../../components/cards/HotelCard';
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Grid from '@mui/material/Grid';
import axios from 'axios';
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
import { Link, useSearchParams } from 'react-router-dom';
import { IconButton, Menu, NativeSelect } from '@mui/material';

const allCities = [
  "Krakow",
  "Warsaw",
  "Bangkok",
  "Karpacz",
  "Berlin",
  "Lizbona"
];

const Hotels = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  const [allHotels, setAllHotels] = useState([])
  const [hotelsData, setHotelsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [filterNameToggled, setFilterNameToggled] = useState(false);
  const [nameValInput, setNameValInput] = useState("");

  useEffect(() => {
    if(searchParams.get("city") != null) { // if check for urls like hotels?city=Bangkok
      sendRequest(searchParams.get("city"));
    }
    else {
      setIsLoading(true);
      const API_URL = `/dashboard/hotels`;
      axios.get(API_URL)
        .then((res) => {
          console.log(res.data);
          setAllHotels(res.data.hotels);
          setHotelsData(res.data.hotels);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [searchParams]);

  const filterToggle = (e) => {
    setFilterNameToggled(!filterNameToggled)
  }

  const handleCityChange = (e) => {
    setSearchParams({ city: e.target.value }) // change the search url like ?city=Bangkok
    setCity(e.target.value);
    sendRequest(e.target.value);
  }

  const sendRequest = (city) => {
    setIsLoading(true)
    const API_URL = `/dashboard/hotels/city?city=${city}`;
    axios.get(API_URL)
      .then((res) => {
        setAllHotels(res.data.hotels)
        setHotelsData(res.data.hotels)
        setIsLoading(false)
      })
      .catch(err => console.error(err));
  }

  const handleNameChange = (e) => {
    setNameValInput(e.target.value)
    const val = e.target.value.toLowerCase().trim().replace(/\s+/g, '')
    console.log(val);
    const queriedHotels = allHotels.filter(hotel => hotel.name.toLowerCase().includes(e.target.value.toLowerCase().trim().replace(/\s+/g, '')))
    console.log(queriedHotels);
    setHotelsData(queriedHotels)
  }

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
      <div className="hotels_filters">
        <div onClick={filterToggle} className={filterNameToggled ? "hotels_name_filter_wide" : "hotels_name_filter"}>
          <SearchOutlinedIcon className='search_icon'/>
          <input value={nameValInput} onChange={handleNameChange} placeholder={filterNameToggled ? "Hotel name" : ""} className="hotels_name_input" type="text"></input>
        </div>
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
        <div className='icons_filter'>
          <IconButton onClick={(e) => {
            setSearchParams((prevParams) => {
              const params = new URLSearchParams(prevParams);
              params.set("see", "true");
              return params;
            })
          }} name="see" className='see-btn-feature'><WaterIcon/></IconButton>
          <IconButton name="mountains"><HikingIcon/></IconButton>
          <IconButton name="parking"><LocalParkingIcon/></IconButton>
        </div>
        <button onClick={(e) => { 
          searchParams.delete("city")
          setCity("")
          setSearchParams(searchParams)
         }} className="clear__filter-btn">
          <ClearIcon className='clear-icon'/>
          <span>Clear Filters</span>
        </button>
      </div>
      {isLoading && <img className='loader_img' src={loader} alt="Loader_hotel"/>}
      {!isLoading && <Grid container rowSpacing={{xl: 2, lg: 2, md: 2, sm: 4, xs: 8}} columnSpacing={{xl: 1, lg: 2, md: 3, sm: 2}}>
        {hotelsData.map((hotel => {
          return (
            <Grid item key={hotel._id} className="hotels_grid-item" xl={3} lg={3} md={4} sm={6} xs={12}>
              <HotelCard key={hotel._id} name={hotel.name} localization={hotel.localization} stars={hotel.stars} imgSrc={hotel?.hotelImage} base64String={hotel?.image?.img?.data?.data} />
            </Grid>
          )
        }))}
      </Grid>}
    </div>
  )  
}

export default Hotels;
