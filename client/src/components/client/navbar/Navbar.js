import React, { useState } from 'react'
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, resetToken } from '../../../features/auth/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../../../img/iconLogo.png';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DropdownMenu from '../../dropdowns/DropdownMenu';
import { Avatar } from '@mui/material';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const onLogout = async (e) => {
    const controller = new AbortController();
    dispatch((resetToken()));
    try {
      const response = await axiosPrivate.get("/auth/logout", {
        signal: controller.signal
      });
      if(response.status === 204) {
        navigate("/", {
          replace: true,
        });
      }
    } catch(err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    }
  }

  return (
    <nav className="navbar_client">
      <div className="logo">
        <img src={logoIcon} alt="logo"></img>
        <Link to="/"><h2>BookNow</h2></Link>
      </div>
      <ul className="links">
        {user?.accessToken ? 
          <>
          <li onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <button className="user__btn">
              <MenuRoundedIcon/>
              <Avatar style={{ width: '30px', height: '30px' }}/>  
            </button>
            <DropdownMenu isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen}/>
          </li>
          <li onClick={onLogout}>
            <button className="logout_btn">
              <LogoutIcon className='logout_icon'/>
              <span>Logout</span>
            </button>
          </li>
          </>
        :
        <>
          <li>
            <Link to="/login" className="link"> 
              <button className="navbar_loginBtn">
                <LoginIcon className="login_icon"/>
                <span>Log In</span>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/register" className="link">
              <button className="navbar_registerBtn">
                <AppRegistrationIcon className="register_icon"/>
                <span>Register</span>
              </button>
            </Link>
          </li>
        </>} 
      </ul> 
    </nav>
  )
}

export default Navbar;