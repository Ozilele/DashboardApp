import React, { useState } from 'react'
import './Header.css';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Avatar } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/appSlice';

const Header = () => {

  const dispatch = useDispatch();
  const [anchorElClicked, setAnchorEl] = useState(null);
  const open = Boolean(anchorElClicked);

  const handleToggle = (e) => {
    dispatch(toggleSidebar());
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  } 

  const handleClose = (e) => {
    setAnchorEl(null);
  }

  return (
    <div className="header__section">
      <div className="header__left__section">
        <IconButton onClick={handleToggle} className="toggle__btn">
          <MenuIcon/>
        </IconButton>
        <div className="input__sec">
          <SearchIcon/>
          <input type="text" className="input__search" placeholder="Search..."></input>
        </div>
      </div>
      <div className="header__right__section">
        <ChatBubbleOutlineOutlinedIcon/>
        <NotificationsOutlinedIcon/>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar className="avatar__icon">B</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorElClicked}
          id="user-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClick}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar/> My account
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
        </Menu>
        <p>Hi, Bartek</p>
        <ArrowDropDownOutlinedIcon/>

      </div>
    </div>
  )
}

export default Header