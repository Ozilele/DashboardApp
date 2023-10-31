import React from 'react';
import { motion } from 'framer-motion';
import './feature_item.css';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * index,
      ease: "easeIn"
    },
  }),
}

const FeatureItem = ({ index, title, icon, desc }) => {
  return (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate" 
      viewport={{
        once: true
      }}
      key={index}
      custom={index}
      className='landingPage-feature-item'
    >
      <div className='landingPage-feature-icon'>
        {icon}
      </div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </motion.div>
  )
}

export default FeatureItem;