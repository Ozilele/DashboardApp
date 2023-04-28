import React, { useState } from 'react'
import someHotel from '../../img/someHotel.jpg';
import { useParams } from 'react-router-dom';
import star from '../../img/star.png';
import axios from 'axios';

const SingleHotel = () => {
  const [hotel, setHotel] = useState([]);
  const [rooms, setRooms] = useState([]);
  let { id } = useParams();

  // useEffect(() => {
  //   const fetchHotel = async ()=> {
  //     try {
  //       const obj = {
  //         identifier: id,
  //       }
  //       const res = await axios.post(`http://localhost:8000/server/hotels/querySingleHotel/${id}`, obj);
  //       console.log(res);
  //       setHotel(res.data);

  //       const res_rooms = await axios.get("http://localhost:8000/server/hotels/queryRooms");
  //       setRooms(res_rooms.data);
  //     }
  //     catch(err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchHotel();
  // }, []);

  return (
    <div className="singleHotelPage">
      <div className="imgContainer">
        <img src={someHotel} alt="hotel"></img>
      </div>
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