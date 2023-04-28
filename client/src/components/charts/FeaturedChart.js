import React from 'react'
import './FeaturedChart.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FeaturedChart = () => {
  return (
    <div className="featured__chart">
      <div className="featured__chart__top">
        <h3>Total Revenue</h3>
        <MoreVertIcon/>
      </div>
      <div className="chart__bottom">
        <div className="progress__bar">
          <CircularProgressbar strokeWidth={3} value={60} text={"60%"}/>
        </div>
        <p className="title">Total bookings made today</p>
        <p className="amount">120</p>
        <p className="desc">Transactions processing. Last payments may not be included</p>
        <div className="summary">
          <div className="summary__item">
            <div className="item__title">Target</div>
            <div className="item__btm" style={{ color: 'red'}}>
              <KeyboardArrowDownIcon/>
              <span>250</span>
            </div>
          </div>
          <div className="summary__item">
          <div className="item__title">Last Week</div>
            <div className="item__btm" style={{ color: 'green'}}>
              <KeyboardArrowUpIcon/>
              <span>324</span>
            </div>
          </div>
          <div className="summary__item">
          <div className="item__title">Last Month</div>
            <div className="item__btm" style={{ color: "red" }}>
              <KeyboardArrowDownIcon/>
              <span>212</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedChart;