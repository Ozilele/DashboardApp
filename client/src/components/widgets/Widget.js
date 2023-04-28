import React from 'react'
import './Widget.css';
import Grid from '@mui/material/Grid';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Widget = ({ title, percent, Icon, message, number, isUp, iconColor }) => {

  const color = isUp ? "#658864" : "red";

  return (
    <div className="widget">
      <div className="widget__first__sec">
        <h3>{title}</h3>
        <div className="percent__sec">
          {isUp && <KeyboardArrowUpIcon style={{ color: color }}/>}
          {!isUp && <KeyboardArrowDownIcon style={{ color: color }}/> }
          <span style={{ color: color }}>{percent} %</span>
        </div>
      </div>
      <div className="widget__second__sec">
        <h2>{number}</h2>
      </div>
      <div className="widget__bottom__sec">
        <div className="widget__msg">
          <p>{message}</p>
        </div>
        <Icon style={{ color: iconColor }}/>
      </div>
    </div>
  )
}

export default Widget