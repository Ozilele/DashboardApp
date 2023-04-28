import React from 'react';
import { useState, useEffect } from "react";
import { DateRange } from 'react-date-range'; // external component for selecting the date
import './Home.css';
import accomodationIcon from '../img/search_1_icon.png';
import calendar from '../img/calendar.png';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  
  // useEffect(() => {
  //   const fetchAllHotels = async function() {
  //     try {
  //       const req = await axios.get("http://localhost:8000/server/hotels/");
  //       setHotels(req.data);
  //     }
  //     catch(err) {
  //       console.log(err);
  //     }
  //   }

  //   fetchAllHotels();
  // }, []);

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

  const handleSearch = async () => {
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
              {openOptions && <div className="options">
                <div className="optionItem">
                  <span className="optionTxt">Adult</span>
                  <div className="optionContainer">
                    <button disabled={options.adult <= 1} className="decreaseBtn" onClick={()=> handleBtn("adult", "d")}>-</button>
                    <span className="optionCounter">{options.adult}</span>
                    <button className="increaseBtn" onClick={()=> handleBtn("adult", "i")}>+</button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionTxt">Children</span>
                  <div className="optionContainer">
                    <button disabled={options.children <= 0} className="decreaseBtn" onClick={()=> handleBtn("children", "d")}>-</button>
                    <span className="optionCounter">{options.children}</span>
                    <button className="increaseBtn" onClick={()=> handleBtn("children", "i")}>+</button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionTxt">Room</span>
                  <div className="optionContainer">
                    <button disabled={options.room <= 1} className="decreaseBtn" onClick={()=> handleBtn("room", "d")}>-</button>
                    <span className="optionCounter">{options.room}</span>
                    <button className="increaseBtn" onClick={()=> handleBtn("room", "i")}>+</button>
                  </div>
                </div>
              </div>}
          </div>
          <div className="filterSearchItem">
            <Link to="/hotels">
              <button className="searchBtn_home" onClick={handleSearch}>Search</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;