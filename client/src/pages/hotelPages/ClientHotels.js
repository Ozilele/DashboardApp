import React, { useState, useEffect} from 'react'
import './ClientHotels.css';
import { Link } from 'react-router-dom';
import hotelImg from '../../img/someHotel.jpg';
import star from '../../img/star.png';
import axios from 'axios';

const ClientHotels = () => {

  const [hotels, setHotels] = useState([]);
  const [inputs, setInputs] = useState(
    {
      destination: "",
      check_in_out_date: "",
      min_price: 0,
      max_price: 0,
      adult: 1,
      children: 1,
      room: 1,
      min_rating: '',
    }
  );

  // useEffect(() => {
  //   const fetchHotelsFromCountry = async () => {
  //     try {
  //       const req = await axios.get("http://localhost:8000/server/hotels/getQueryCountry");
  //       setHotels(req.data);
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchHotelsFromCountry();
  // }, []);


  const handleInputChange = (e) => {
    setInputs(prev=> ({
      ...prev,
      [e.target.name]: e.target.value // selected input change
    }));
  }

  const handleSearch = () => {
    const fetchSpecificHotels = async () => {
      try {
        const res = await axios.post("http://localhost:8000/server/hotels/queryHotels", inputs);
        setHotels(res.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchSpecificHotels();
  }

  return (
    <div className="searchResultsPage">
      <div className="searchResults">
        <div className="searchBox">
          <h3>Search</h3>
          <div className="searchField">
            <label>Destination</label>
            <input type="text" name="destination" placeholder="e.g. Paris" onChange={handleInputChange}></input>
          </div>
          <div className="searchField">
            <label>Check-in date</label>
            <input name="check_in_out_date" onChange={handleInputChange} type="text" placeholder="04/27/2022 - 04/29/2022"></input>
          </div>
          <div className="options">
            <label>Options</label>
            <div className="optionRow">
              <label>Min price(per night)</label>
              <input name="min_price" onChange={handleInputChange} type="text"></input>
            </div>
            <div className="optionRow">
              <label>Max price(per night)</label>
              <input name="max_price" onChange={handleInputChange} type="text"></input>
            </div>
            <div className="optionRow">
              <label>Adult</label>
              <input name="adult" onChange={handleInputChange} type="number"></input>
            </div>
            <div className="optionRow">
              <label>Children</label>
              <input name="children" onChange={handleInputChange} type="number"></input>
            </div>
            <div className="optionRow">
              <label>Room</label>
              <input name="room" onChange={handleInputChange} type="number"></input>
            </div>
            <div className="optionRow">
              <label>Rating</label>
              <input name="min_rating" onChange={handleInputChange} type="text"></input>
            </div>
            <button className="searchBtn" onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="results">
          {hotels.map((hotel => {
            return (
              <div className="searchRow" key={hotel.id}>
                <div className="imgSec">
                  <img src={hotelImg} alt="hotel"></img>
                </div>
                <div className="searchContent">
                  <div className="dataContainer">
                    <h3 className="searchTitle">{hotel.name}</h3>
                    <div className="dataItems">
                      <span className="standard">{hotel.standard.split(" ")[0]}<img alt="starImg" src={star}></img></span>
                      <span className="rating">{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="location">{`${hotel.city} ${hotel.street}`}</p>
                  <p className="description">{`${hotel.description.slice(0, 150)}...`}</p>
                  <Link to={`../hotel/${hotel.id}`} >
                    <button className="checkBtn">Check More</button>
                  </Link>
                </div>
              </div>
              )
            }))}
          </div>
        </div>
      </div>
  )
}

export default ClientHotels;
