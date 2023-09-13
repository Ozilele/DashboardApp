import React, { memo } from 'react';
import './FilterBoxOptions.css';

const FilterBoxOptions = ({ options, handleBtn }) => {
  return (
    <div className="filter-box-options">
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
    </div>
  )
}

export default memo(FilterBoxOptions);