import React, { useState } from 'react';
import "./index.css";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CircleIcon from '@mui/icons-material/Circle';
import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import image from "../../../img/person_.png";
import image2 from "../../../img/person_1.png";
import useImageLoaded from '../../../hooks/useImageLoaded';

const initialReviews = [
  {
    key: "zaazz",
    imgSrc: image,
    blurredImgSrc: "../../../img/person_blurred.png",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    key: "bumcysa",
    imgSrc: image2,
    blurredImgSrc: "../../../img/person_1blurred.png",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    key: "eleleooe",
    imgSrc: image,
    blurredImgSrc: "../../../img/person_blurred.png",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  }
]


const ClientReviewSlider = () => {

  const [currentSlide, setCurrentSlide] = useState(1);
  const { ref, onLoad, loaded } = useImageLoaded();

  const goToSlide = (e, newSlide) => {
    setCurrentSlide(newSlide);
  } 

  const goToNextSlide = () => {
    if(currentSlide === initialReviews.length) {
      setCurrentSlide(1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }

  const goToPreviousSlide = () => {
    if(currentSlide === 1) {
      setCurrentSlide(initialReviews.length);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  return (
    <div className='review-slider-box'>
      <AnimatePresence> 
        <motion.div
          key={initialReviews[currentSlide - 1].key}
          viewport={{ once: true }}
          initial={{ x: 10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            duration: 0.5
          }}
          className='review-item'>
          <div 
            style={{ backgroundImage: `url('${initialReviews[currentSlide - 1].blurredImgSrc}')` }} 
            className='review-item-image'
          >
            <img 
              ref={ref}
              onLoad={onLoad}
              style={{ opacity: loaded ? 1 : 0 }}
              src={initialReviews[currentSlide - 1].imgSrc} 
              alt="foto"
              loading='lazy'
            />
            <div className='review-item-left-btn-item-image'>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.2, transition: { duration: 0.35 } }}
                onClick={goToPreviousSlide}
              >
                <KeyboardArrowLeftRoundedIcon/>
              </motion.button>
            </div>
            <div className='review-item-right-btn-item-image'>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.2, transition: { duration: 0.35 } }}
                onClick={goToNextSlide}
              >
                <KeyboardArrowRightRoundedIcon/>
              </motion.button>
            </div>
          </div>
          <div className='review-item-content'>
            <FormatQuoteIcon className='quote-left'/>
            <div className='review-item-box'/>
            <p>{initialReviews[currentSlide - 1].content}</p>
            <FormatQuoteIcon className='quote-right'/>
          </div>
          <div className='review-item-left-btn'>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2, transition: { duration: 0.35 } }}
              onClick={goToPreviousSlide}
            >
              <KeyboardArrowLeftRoundedIcon/>
            </motion.button>
          </div>
          <div className='review-item-right-btn'>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2, transition: { duration: 0.35 } }}
              onClick={goToNextSlide}
            >
              <KeyboardArrowRightRoundedIcon/>
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="review-slider-dots">
        {initialReviews.map((review, i) => (
          <IconButton key={i} onClick={(e) => goToSlide(e, i + 1)}>
            <CircleIcon style={{ color: currentSlide === i + 1 ? '#FFB000' : ''}}/>
          </IconButton>
        ))}
      </div>
    </div>
  )
}

export default ClientReviewSlider;