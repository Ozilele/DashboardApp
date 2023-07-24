import React from 'react'
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, reset, logout } from '../../features/auth/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../../img/iconLogo.png';

const Navbar = () => {

  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = (e) => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  const userSettingsLink = user ? `/user/${user._id}` : '';

  return (
  <nav className="navbar_client">
    <div className="logo">
      <img src={logoIcon} alt="logo"></img>
      <Link to="/"><h2>BookNow</h2></Link>
    </div>
    <ul className="links">
      {user ? 
        <>
        <li>
          <Link to={userSettingsLink}>
            <button className="user__btn">
              <PersonOutlineIcon className="person_icon"/>
              <span>{user.firstName}</span>
            </button>
          </Link>
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