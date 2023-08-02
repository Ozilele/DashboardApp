import React, { useState } from 'react'
import someHotel from '../../img/someHotel.jpg';
import { useParams } from 'react-router-dom';
import star from '../../img/star.png';
import axios from 'axios';
import Cookies from 'js-cookie';

const SingleHotel = () => {
  const [hotel, setHotel] = useState([]);
  const [rooms, setRooms] = useState([]);

  const handlePaymentCheckout = async (e) => {
    const { accessToken } = Cookies.get();

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const response = await axios.post(`/api/client/checkout?price=price_1NZ0tnJ1TgaWBK1fzlqTSrWD`, {
      data: 'Test data'
    }, config);
    if(response.data.url) {
      window.location.assign(response.data.url); // Forward user to the Stripe Checkout
    }
  }

  return (
    <div className="singleHotelPage">
      <div className="imgContainer">
        <img src={someHotel} alt="hotel"></img>
      </div>
      <button onClick={handlePaymentCheckout}>Checkout</button>
      {hotel.map(hotel => {
        return (
          <div className="contentContainer">
            <h2>{hotel.name}</h2>
            <div className="infoContainer">
              <div className="info">
                <h3>{hotel.country}</h3>
                <span>{hotel.city}</span>
                <span>{hotel.street}</span>
                <span>{hotel.zip_code}</span>
              </div>
              <div className="rating">
                <span>{hotel.rating}</span>
                <span>{hotel.standard.split(" ")[0]} <img src={star}></img></span>
              </div>
            </div>
            <p className="desc">{hotel.description}</p>
            <div className="options">
              <span>Close to see: {hotel.closeToSee ? 'yes' : 'no'}</span>
              <span>Close to mountains: {hotel.closeToMountains ? 'yes' : 'no'}</span>
              <span>Parking available: {hotel.hasParking ? 'yes' : 'no'}</span>
              <span>Restaurant available: {hotel.hasRestaurant ? 'yes' : 'no'}</span>
            </div>
            <div className="rooms">
              {rooms.map((room) => {
                return (
                  <div className="roomItem"> 
                    <div className="roomInfo"> 
                      <input type="checkbox"></input>
                      <label>Room nr {room.number}</label>
                      <span>Status: {room.status}</span>
                      <span>Type: {room.type}</span>
                    </div>
                    <div className="roomPrice">
                      <span>Price: {room.price}</span>
                    </div>
                  </div>
                )
              })}
              <button className="bookBtn">Book the Room</button>
            </div>
          </div>
        )
      })}
      </div>
  )
}

export default SingleHotel