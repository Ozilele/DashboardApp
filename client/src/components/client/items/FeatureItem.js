import React from 'react';
import { motion } from 'framer-motion';
import './feature_item.css';

const FeatureItem = ({ title, icon, desc }) => {
  return (
    <motion.div 
      className='landingPage-feature-item'>
      <div className='landingPage-feature-icon'>
        {icon}
      </div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </motion.div>
  )
}

export default FeatureItem;