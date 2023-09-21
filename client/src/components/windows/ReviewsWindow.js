import React, { useEffect, useMemo, useState, memo } from 'react';
import "./ReviewsWindow.css";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ReviewItem from '../client/items/ReviewItem';
import axios from 'axios';
import LoginIcon from '@mui/icons-material/Login';
import Rating from '@mui/material/Rating';
import Cookies from 'js-cookie';
import { Avatar, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { toggleModalWindow } from '../../features/appSlice';
const API_URL = "/api/client/reviews";

const ReviewsWindow = ({ hotelId, hotelName, localization }) => {
  
  const [reviews, setReviews] = useState([]);
  const [newReviewForm, setReviewForm] = useState(false);
  const [stars, setStars] = useState(5);
  const dispatch = useDispatch();
  const [currSection, setCurrSection] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewContent, setReviewContent] = useState("");

  const { isAuthorized, isLoading } = useAuth("client");
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`${API_URL}?hotelID=${hotelId}&section=${currSection}`)
      .then((res) => {
        if(res.status === 201) {
          setTotalReviews(res.data.allReviews);
          const newReviews = res.data.reviews.map((review) => {
            return {
              id: review._id,
              rating: review.rating,
              content: review?.content,
              date: review.updatedAt.toLocaleString(),
              username: `${review.author.firstName} ${review.author.secondName}`,
              userProfile: review.author.imageFile ? review.author.imageFile : "",
            }
          });
          setReviews(newReviews);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const publishReview = async (e) => {
    const { accessToken } = Cookies.get();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const response = await axios.post(API_URL, {
      hotelID: hotelId,
      rating: stars,
      content: reviewContent,
    }, config);
    console.log(response);
    if(response.status === 201) {
      setReviewForm(false);
    }
  }

  return (
    <div onClick={(e) => dispatch(toggleModalWindow())} className='reviews-window-modal'>
      <button onClick={(e) => dispatch(toggleModalWindow())}>X</button>
      <div onClick={(e) => e.stopPropagation()} className='reviews-window-content'>
        {!newReviewForm && 
        <>
          <div className='reviews-window-top'>
            <div>
              <h3>{hotelName}</h3>
              <span>{localization?.city}{", "}{localization?.address}</span>
            </div>
            <button onClick={(e) => setReviewForm(!newReviewForm)} className="new-review-btn">
              <DriveFileRenameOutlineIcon/>
              <span>Add a review</span>
            </button>
          </div>
          <div className='reviews-window-rating'>
            <h4>8.85</h4>
            <span>{totalReviews} reviews</span>
          </div>
          <div className='reviews-window-opinions'>
            <div className='reviews-window-filters'>
              <button>Newest</button>
              <button>Accurate</button>
              <button>The best</button>
              <button>The worst</button>
            </div>
            <div className='reviews-window-opinions-content'>
              {reviews.map((review, i) => {
                return (
                  <ReviewItem 
                    key={i}
                    id={review.id}
                    rating={review.rating}
                    content={review.content}
                    date={review.date}
                    username={review.username}
                    userProfilePicture={review.userProfile}
                  />
                )
              })}
            </div>
          </div>
        </>}
        {(newReviewForm && isAuthorized) && (
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
              <button onClick={(e) => setReviewForm(!newReviewForm)} className='review-form-btns-cancel'>Cancel</button>
              <button onClick={publishReview} className='review-form-btns-publish'>Publish</button>
            </div>
          </div>
        )}  
        {(newReviewForm && !isAuthorized) && (
          <div className='add-review-not-authorized'>
            <h3>You need to be logged in to add a review</h3>
            <a href='/login'>
              <button>
                <LoginIcon/>
                <span>Log In</span>
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(ReviewsWindow);