import React, { useEffect, useState, memo } from 'react';
import "./ReviewsWindow.css";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ReviewItem from '../client/items/ReviewItem';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toggleModalWindow } from '../../features/appSlice';
import ReviewForm from '../forms/ReviewForm';

const ReviewsWindow = ({ hotelId, hotelName, localization, rating }) => {
  
  const [reviews, setReviews] = useState([]);
  const [newReviewForm, setReviewForm] = useState(false);
  const [currSection, setCurrSection] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewsMsg, setReviewsMsg] = useState("");
  
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`/api/client/reviews?hotelID=${hotelId}&section=${currSection}`)
      .then((res) => {
        if(res.status === 200) {
          if(res.data.allReviews === 0) {
            setReviewsMsg("No reviews were found");
            setTotalReviews(res.data.allReviews);
            return;
          }
          setTotalReviews(res.data.allReviews);
          const newReviews = res?.data?.reviews.map((review) => {
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
            <h4>{rating}</h4>
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
              {reviewsMsg !== "" && 
              <div className='reviews-msg-not-found'>
                <h3>{reviewsMsg}</h3>
              </div>}
            </div>
          </div>
        </>}
        {newReviewForm && (
          <ReviewForm setReviewForm={setReviewForm} hotelId={hotelId}/>
        )}  
      </div>
    </div>
  )
}

export default memo(ReviewsWindow);