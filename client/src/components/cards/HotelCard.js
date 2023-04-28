import React from 'react'
import './HotelCard.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Card } from 'antd';

const { Meta } = Card;

const HotelCard = () => {
  return (
    <Card
      style={{ display: 'flex',  flexDirection: 'column', padding: '4px'}}
      hoverable
      tabBarExtraContent={
        <p>$1500</p>
      }
      cover={
        <img
          alt="hotelImg"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <EditOutlinedIcon key="edit" />,
        <DeleteOutlineOutlinedIcon key="delete"/>,
      ]}
    >
      <div className="hotel-card-content">
        <div className="hotel-card-top">
          <h3>Intercontinental Warsaw</h3>
          <div className="hotel-price-badge">
            <p>$150</p>
          </div>
        </div>
        <div className="hotel-card-bottom">
          <LocationOnIcon/>
          <p>Warsaw, Jerozolimska 9 08-789 Poland</p>
        </div>
      </div>    
    </Card>
  )
}

export default HotelCard