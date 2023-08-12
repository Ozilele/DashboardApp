import React, { memo } from 'react';
import "./ReviewItem.css";
import { deepOrange } from '@mui/material/colors';
import { Avatar } from '@mui/material';

const ReviewItem = ({ id, rating, content="", date, username, userProfilePicture = ""}) => {

  const stars = Array.from({ length: rating }, (_, index) => index);

  return (
    <div className='review-window-item'>
      <div className='review-window-item-top'>
        <Avatar style={{ width: '34px', height: '34px' }} src={userProfilePicture !== "" ? `http://localhost:8000/uploads/users/${userProfilePicture}` : null}>
          {userProfilePicture === "" && username[0]}
        </Avatar>
        <div>
          <h4>{username}</h4>
          <h5>{new Date(date).toLocaleString()}</h5>
        </div>
      </div>
      <div className='review-window-item-content'>
        {stars.map(i => {
          return <span key={i}>⭐️</span>
        })}
        <p>{content}</p>
        <span>Rating: {rating}</span>
      </div>
    </div>
  )
}

export default memo(ReviewItem);