import React, { memo } from 'react';
import './index.css';

const AccomodationInput = ({ rowName, inputs, handleInputChange }) => {
  return (
    <div className='accomodation-row'>
      <label htmlFor={rowName}>{rowName[0].toUpperCase() + rowName.slice(1)}</label>
      <input
        name={rowName}
        value={inputs[rowName]}
        onChange={handleInputChange} 
        type="text" 
        inputMode="numeric"
        pattern="[0-9]+" 
        id={rowName}/>
    </div>
  )
}

export default memo(AccomodationInput);