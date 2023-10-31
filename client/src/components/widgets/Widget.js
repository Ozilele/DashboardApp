import React from 'react'
import './Widget.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../../features/appSlice';

const darkThemeWidgetColors = [
  "#35D7E3",
  "#4C96F6",
  "#8B61FB",
  "#FBAEB9"
]

const Widget = ({ title, percent, Icon, message, number, isUp, iconColor }) => {

  const theme = useSelector(selectAppTheme);

  return (
    <div className="widget">
      <div className="widget__first__sec">
        <h3>{title}</h3>
        <div className="percent__sec">
          {isUp && <KeyboardArrowUpIcon style={{ color: '#658864' }}/>}
          {!isUp && <KeyboardArrowDownIcon style={{ color: 'red' }}/> }
          <span style={{ color: 'red' }}>{percent}%</span>
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