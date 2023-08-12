import React, { useState } from 'react';
import "./index.css";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CircleIcon from '@mui/icons-material/Circle';
import image from "../../../img/person_.png";
import image2 from "../../../img/person_1.png";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { IconButton } from '@mui/material';

const initialReviews = [
  {
    imgSrc: image,
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    imgSrc: image2,
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    imgSrc: image,
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  }
]


const ClientReviewSlider = () => {

  const [currentSlide, setCurrentSlide] = useState(1);
  const [scope, animate] = useAnimate();

  const goToSlide = (e, newSlide) => {
    setCurrentSlide(newSlide);
    // setCurrentReview(initialReviews[newSlide - 1]);
    animate(scope.current, {   }, { duration: 0.6 });
  } 

  return (
    <div className='review-slider-box'>
      <AnimatePresence  > 
        <motion.div
          ref={scope} 
          // initial={{ x: "-100%" }}
          whileInView={{ x: "0" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.6 }}
          className='review-item'>
          <div className='review-item-image'>
            <img src={initialReviews[currentSlide - 1].imgSrc} alt="foto"/>
          </div>
          <div className='review-item-content'>
            <FormatQuoteIcon className='quote-left'/>
            <div className='review-item-box'/>
            <p>{initialReviews[currentSlide - 1].content}</p>
            <FormatQuoteIcon className='quote-right'/>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="review-slider-dots">
        {initialReviews.map((review, i) => (
          <IconButton key={i} onClick={(e) => goToSlide(e, i + 1)}>
            <CircleIcon/>
          </IconButton>
        ))}
      </div>
    </div>
  )
}

export default ClientReviewSlider;