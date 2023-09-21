import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/appSlice';
import './SidebarOption.css';

const variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      y: { velocity: -50, stiffness: 800, }
    }
  },
  closed: {
    x: 7,
    opacity: 0,
    transition: {
      y: { stiffness: 800 }
    }
  }
};

const SidebarOption = ({ name, Icon, path }) => {

  const dispatch = useDispatch();

  const handleClassChange = (e) => {
    dispatch(toggleSidebar());
  }

  return (
    <motion.a variants={variants} onClick={handleClassChange} className="sidebar__link" href={path}>
      <div className="sidebar__option">
        <Icon />
        <h4>{name}</h4>
      </div>
    </motion.a>
  )
}

export default SidebarOption;