import React, { memo, useEffect, useState } from 'react';
import './ReviewForm.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Rating from '@mui/material/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ setReviewForm, hotelId }) => {

  const [stars, setStars] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAlreadyPosted, setHasAlreadyPosted] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    const controller = new AbortController();
    if(user?.accessToken) {
      setIsLoggedIn(true);
    }
    const checkIfUserPosted = async () => {
      try {
        const response = await axiosPrivate.get(`/api/client/review?hotelID=${hotelId}`, {
          signal: controller.signal
        });
        if(response.data.review) {
          setHasAlreadyPosted(true);
        }
      } catch(err) {
        console.log(err);
      }
    }
    checkIfUserPosted();
    return () => {
      controller.abort();
    }
  }, []);

  const publishReview = async (e) => {
    try {
      const response = await axiosPrivate.post("/api/client/reviews", {
        hotelID: hotelId,
        rating: stars,
        content: reviewContent,
      });
      if(response.status === 201) {
        setReviewForm(false);
      }
    } catch(err) {
      console.log(err);
      navigate("/login", { replace: true });
    }
  }

  return (
    <>
      {(isLoggedIn && !hasAlreadyPosted) &&
        <div className='review-form-user-container'>
          <div className="review-form-user-top">
            <Avatar alt="review_avatar" src={user?.imageFile}/>
            <h3>{user?.firstName}{" "}{user?.secondName}</h3>
          </div>
          <div className='review-form-rating'>
            <Typography component="legend">Your rating for hotel</Typography>
            <Rating 
              name="customized-10"
              precision={0.5}
              max={10}
              value={stars}
              onChange={(event, newValue) => setStars(newValue)}/>
          </div>
          <div className='review-form-content'>
            <label htmlFor="review-content">Your review of hotel:</label>
            <textarea value={reviewContent} onChange={e => setReviewContent(e.target.value)} id="review-content" name="review-content" rows="7" cols="50"></textarea>
          </div>
          <div className='review-form-btns'>
            <button onClick={(e) => setReviewForm(false)} className='review-form-btns-cancel'>Cancel</button>
            <button onClick={publishReview} className='review-form-btns-publish'>Publish</button>
          </div>
        </div>
      }
      {!isLoggedIn && 
        <div className='add-review-not-authorized'>
          <h3>You need to be logged in to add a review</h3>
          <a href='/login'>
            <button>
              <LoginIcon/>
              <span>Log In</span>
            </button>
          </a>
        </div>
      }
      {(isLoggedIn && hasAlreadyPosted) &&
        <div className='already-posted-div'>
          <h2>You've already posted a review</h2>
          <button onClick={(e) => setReviewForm(false)}>
            <ArrowBackIcon/>
            <span>Back</span>
          </button>
        </div>
      }
    </>
  )
}

export default memo(ReviewForm);