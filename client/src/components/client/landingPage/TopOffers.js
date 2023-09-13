import React, { memo, useState, useRef, useEffect } from 'react';
import './TopOffers.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { offers } from "../../../utils/appDummyData.js"
import TopOffer from '../items/TopOffer';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: [0.17, 0.67, 0.83, 0.67],
      staggerDirection: 1,
    }
  }
}

const TopOffers = () => {

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <motion.div className='top-offers'>
      <motion.h3
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'tween', duration: 0.4, delay: 0.32 }}>Top Offers</motion.h3>
      <motion.div ref={carousel} className='top-offers-carousel'>
        <div className='top-offers-left'>
          <IconButton>
            <KeyboardArrowLeftIcon/>
          </IconButton>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          drag="x"
          whileTap={{ cursor: 'grabbing' }}
          dragConstraints={{ right: 0, left: -width }} 
          className="top-offers-results"> 
            {offers.map((offer, i) => {
              return (
                <TopOffer
                  key={i} 
                  styleTransform={(i * 0.33)}
                  hotelName={offer.hotelName}
                  localization={offer.localization}
                  rating={offer.rating}
                  features={offer.features}
                />
              )
            })}
        </motion.div>
        <div className='top-offers-right'>
          <IconButton onClick={() => setWidth((prev) => prev + 200)}>
            <KeyboardArrowRightIcon/>
          </IconButton>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default memo(TopOffers);