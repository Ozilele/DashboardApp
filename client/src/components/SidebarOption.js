import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/appSlice';
import './SidebarOption.css';

const SidebarOption = ({ name, Icon, path }) => {

  const dispatch = useDispatch();

  const handleClassChange = (e) => {
    dispatch(toggleSidebar());
  }

  return (
    <Link onClick={handleClassChange} className="sidebar__link" to={path}>
      <div className="sidebar__option">
        <Icon />
        <h4>{name}</h4>
      </div>
    </Link>
  )
}

export default SidebarOption;