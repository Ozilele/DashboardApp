import React, { memo } from 'react';
import './HotelCard.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Rating from '@mui/material/Rating';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CardActions, IconButton } from '@mui/material';
import axios from 'axios';

const HotelCard = ({ id, name, localization, stars, imgSrc, base64String, makeRequest }) => {

  const base_64_string = btoa(
    new Uint8Array(base64String).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );  

  const stars_ = Array.from({ length: stars }, (_, index) => index);
    
  const deleteHotel = async (e) => {
    const API_URL = `/admin/hotels/${id}`;
    const response = await axios.delete(API_URL);
    if(response.data.message === "Hotel deleted successfully") {
      makeRequest();
    }
  }

  return (
    <Card className='hotel-card'>
      <CardMedia
        style={{ minHeight: 0, maxHeight: '300px', flexGrow: 1 }}
        component="img"
        src={base64String ? `data:image/jpeg;base64,${base_64_string}` : `http://localhost:8000/uploads/hotels/${imgSrc}`}
        alt={name}
      />
      <CardContent style={{ flexGrow: 1 }}>
        <Typography style={{ marginBottom: '4px' }} gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography style={{ marginBottom: '10px' }}>
          {stars_.map(i => {
            return <span style={{width: '18px'}} key={i}>⭐️</span>
          })}
        </Typography>
        <Typography className='location-area'>
          <LocationOnIcon/>
          {localization.city}{", "}{localization.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='edit'>
          <EditOutlinedIcon/>
        </IconButton>
        <IconButton onClick={deleteHotel} style={{ color: 'red' }} aria-label="delete">
          <DeleteOutlineOutlinedIcon/>
        </IconButton>
        <IconButton aria-label='view-more'>
          <MoreVertOutlinedIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default memo(HotelCard);