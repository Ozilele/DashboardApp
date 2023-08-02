import React from 'react';
import { useState, useEffect } from "react";
import { DateRange } from 'react-date-range'; // external component for selecting the date
import './Home.css';
import SearchIcon from '@mui/icons-material/Search';
import accomodationIcon from '../../../img/search_1_icon.png';
import calendar from '../../../img/calendar.png';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import TopOffers from '../../../components/client/home/TopOffers';
import FilterBoxOptions from '../../../components/client/home/FilterBoxOptions';

const Home = () => {

  const [input, setInput] = useState({
    country: '',
  })
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [dateIsVisible, setDateIsVisible] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  
  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  }

  const handleBtn = (value, action) => {
    setOptions((prev) => {
      return {
        ...prev,
        [value]: action === 'i' ? options[value]++ : options[value]--,
      }
    });
  }

  const handleInput = (e) => {
    setInput((prev) => {
      return ({
        ...prev,
        [e.target.name]: e.target.value,
      })
    })
  } 

  return (
    <div className="homeBanner">
      <div className="home_container">
        <div className="homeContent">
          <h2>Feeling tired and thinking of some rest somewhere?<br></br>We are here for you!</h2>
        </div>
        <div className="filterBox">
          <div className="filterSearchItem">
            <img src={accomodationIcon} alt="search_icon"></img>
            <input onChange={handleInput} name="country" type="text" placeholder="Where do you want to go?" className="searchInput"></input>
          </div>
          <div className="filterSearchItem">
            <img src={calendar} alt="calendar"></img>
            <span onClick={()=> setDateIsVisible(!dateIsVisible)} className="searchtxt">{`${formatDate(date[0].startDate)}`} to {`${formatDate(date[0].endDate)}`}</span>
            {dateIsVisible && 
              <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="datePicker"
              />}
          </div>
          <div className="filterSearchItem">
            <img src={calendar} alt="options"></img>
            <span onClick={()=>setOpenOptions(!openOptions)} className="searchtxt">{`${options.adult} adult • ${options.children} children • ${options.room} room`}</span>
              {openOptions && <FilterBoxOptions options={options} handleBtn={handleBtn}/>}
          </div>
          <div className="filterSearchItem filterSearchItemBtn">
            <Link to="/hotels">
              <IconButton style={{ background: "#0D1282" }}>
                <SearchIcon style={{ width: '22px', height: '22px', color: "whitesmoke" }}/>
              </IconButton>
            </Link>
          </div>
        </div>
        <TopOffers />
      </div>
    </div>
  )
}

export default Home;