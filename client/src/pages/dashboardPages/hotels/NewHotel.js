import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewHotel.css';
import { convertToBase64 } from '../../../utils/helpers.js';

const initialInputs = {
  hotelName: "",
  hotelCountry: "",
  hotelCity: "",
  hotelAddress: "",
  stars: 0,
}

const NewHotel = () => {
  
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState(initialInputs);
  const [checkboxInputs, setCheckboxInputs] = useState({
    features_see: false,
    features_mountains: false,
    features_parking: false,
  });
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  const handleCheckboxInputs = (e) => {
    setCheckboxInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.checked
      }
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setInputs(initialInputs);
    const API_URL = `/dashboard/hotels`;
    try {
      let fileData;
      if(file) {
        fileData = await convertToBase64(file);
      }
      const hotelsResponse = await axios.post(API_URL, {
        name: inputs.hotelName,
        country: inputs.hotelCountry,
        localization: {
          city: inputs.hotelCity,
          address: inputs.hotelAddress,
        },
        stars: inputs.stars,
        features: {
          closeToSee: checkboxInputs.features_see,
          closeToMountains: checkboxInputs.features_mountains,
          hasParking: checkboxInputs.features_parking, 
        },
        hotelImage: fileData ? fileData : null,
      });
      if(hotelsResponse.status === 201) {
        navigate('/dashboard/hotels');
      }
    } catch(err) {
      console.log(err);
    }
  }

  // action='http://localhost:8000/dashboard/hotels/upload' enctype="multipart/form-data" method='POST'
  return (
    <div className='new-hotel-form'>
      <h2>Add New Hotel</h2>
      <form onSubmit={handleFormSubmit} className='upload-hotel-form'>
        <input onChange={e => setFile(e.target.files[0])} type="file" name="image"/>
        <label htmlFor="file">Choose File</label>
        <div className='form-input'>
          <label>Name:</label>
          <input name="hotelName" onChange={handleInputs} type="text" placeholder='Mariott'/>
        </div>
        <div className='form-input'>
          <label>Country:</label>
          <input name="hotelCountry" onChange={handleInputs} type="text" placeholder='Poland'/>
        </div>
        <div className='form-input'>
          <label>City:</label>
          <input name="hotelCity" onChange={handleInputs} type="text" placeholder='Warsaw'/>
        </div>
        <div className='form-input'>
          <label>Address:</label>
          <input name="hotelAddress" onChange={handleInputs} type="text" placeholder='Woronicza 32'/>
        </div>
        <div className='form-input'>
          <label>Stars:</label>
          <input name="stars" onChange={handleInputs} type="number" placeholder='3-4-5'/>
        </div>
        <div className='form-input-checkbox'>
          <label>Close To See:</label>
          <input checked={checkboxInputs.features_see} name="features_see" onChange={handleCheckboxInputs} type="checkbox"/>
        </div>
        <div className='form-input-checkbox'>
          <label>Close To Mountains:</label>
          <input checked={checkboxInputs.features_mountains} name="features_mountains" onChange={handleCheckboxInputs} type="checkbox"/>
        </div>
        <div className='form-input-checkbox'>
          <label>Has Parking:</label>
          <input checked={checkboxInputs.features_parking} name="features_parking" onChange={handleCheckboxInputs} type="checkbox"/>
        </div>
        <button onClick={handleFormSubmit} type="submit" className='submit-newHotel-btn'>Add</button>
      </form>
    </div>
  )
}

export default NewHotel;