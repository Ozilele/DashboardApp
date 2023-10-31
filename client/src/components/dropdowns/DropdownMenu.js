import React from 'react';
import "./DropdownMenu.css";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuVariants = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    }
  },
  open: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    }
  }
}

const itemVariants = {
  variants: {
    closed: { x: -16, opacity: 0, },
    open: { x: 0, opacity: 1 }
  },
  transition: { opacity: { duration: 0.2 } },
}

const DropdownMenu = ({ isOpen, setIsOpen }) => {

  const DropdownItem = ({ href, content, Icon }) => {
    return (
      <motion.a
        {...itemVariants}
        className='navbar-dropdown-link'
        href={href}
      >
        <Icon/>
        <span>{content}</span>
      </motion.a>
    )
  }

  return (
    <motion.div 
      className='navbar-dropdown-menu'
      animate={isOpen ? "open" : "closed"}
      initial="closed"
      exit="closed"
      variants={menuVariants}
    >
      <DropdownItem 
        content="Settings"
        href="/user/settings"
        Icon={SettingsRoundedIcon}/>
      <DropdownItem 
        content="Favorites"
        href="/user/favorites"
        Icon={FavoriteBorderRoundedIcon}/>
      <DropdownItem 
        content="Bookings"
        href="/user/bookings"
        Icon={BookRoundedIcon}/>
    </motion.div>
  )
}

export default DropdownMenu;