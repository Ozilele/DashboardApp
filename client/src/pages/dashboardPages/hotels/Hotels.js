import React, { useState } from 'react'
import './Hotels.css';
import HotelCard from '../../../components/cards/HotelCard';
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import WaterIcon from '@mui/icons-material/Water';
import HikingIcon from '@mui/icons-material/Hiking';
import { IconButton } from '@mui/material';

const Hotels = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterNameToggled, setFilterNameToggled] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    minPrice: null,
    maxPrice: null,
    city: "",
    closeToMountains: false,
    closeToSee: false,
    hasParking: false,
  })

  const addHotel = (e) => {

  }

  const filterToggle = (e) => {
    setFilterNameToggled(!filterNameToggled)
  }

  const allCities = [
    "Wrocław",
    "Warszawa",
    "Nowy Jork",
    "Karpacz",
    "Berlin",
    "Lizbona"
  ]

  return (
    <div className="hotels__section">
      <div className="hotels__top">
        <h2>All Hotels</h2>
        <button onClick={addHotel} className='add-hotel-btn'>
          <AddIcon/>
          <span>Add Hotel</span>
        </button>
      </div>
      <div className="hotels_filters">
        <div onClick={filterToggle} className={filterNameToggled ? "hotels_name_filter_wide" : "hotels_name_filter"}>
          <SearchOutlinedIcon className='search_icon'/>
          <input placeholder={filterNameToggled ? "Hotel name" : ""} className="hotels_name_input" type="text"></input>
        </div>
        <div className="location_filter">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allCities}
            sx={{ marginLeft: 4 ,width: 200, height: 42 }}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
        </div>
        <div className='icons_filter'>
          <IconButton><WaterIcon/></IconButton>
          <IconButton><HikingIcon/></IconButton>
        </div>
      </div>
      <Grid style={{padding: "20px"}} className="hotels_grid" container rowSpacing={{xl: 2, lg: 2, md: 2, sm: 4, xs: 8}} columnSpacing={{xl: 1, lg: 2, md: 3, sm: 2}}>
        <Grid className="hotels_grid-item" item xl={2} lg={3} md={4} sm={6} xs={10}>
          <HotelCard/>
        </Grid>
        <Grid className="hotels_grid-item" item  xl={2} lg={3} md={4} sm={6} xs={10}>
          <HotelCard/>
        </Grid>
        <Grid className="hotels_grid-item" item  xl={2} lg={3} md={4} sm={6} xs={10}>
          <HotelCard/>
        </Grid>
        <Grid className="hotels_grid-item" item  xl={2} lg={3} md={4} sm={6} xs={10}>
          <HotelCard/>
        </Grid>
        <Grid className="hotels_grid-item" item  xl={2} lg={3} md={4} sm={6} xs={10}>
          <HotelCard/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Hotels