import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCurrentLink, setCurrentLink, toggleSidebar } from '../../features/appSlice';
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

const Link = styled.a`
  background-color: ${props => (props.isactive === props.name ? 'var(--sidebar-option-active-color)' : '')};
  color: ${props => (props.isActive === props.name ? '#FFE5F1' : '')};
`;

const SidebarOption = ({ name, Icon, path }) => {

  const dispatch = useDispatch();
  const currentLink = useSelector(selectCurrentLink);

  const handleClassChange = (e) => {
    dispatch(setCurrentLink(name));
    dispatch(toggleSidebar());
  }

  return (
    <Link isactive={currentLink} name={name} onClick={handleClassChange} variants={variants} className="sidebar__link" href={path}>
      <div style={{ color: currentLink === name ? "whitesmoke" : "" }}  className="sidebar__option">
        <Icon />
        <h4>{name}</h4>
      </div>
    </Link>
  )
}

export default memo(SidebarOption);