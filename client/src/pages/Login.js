import React, {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset, selectUser } from '../features/auth/authSlice';
import './Login.css';
import loader from '../img/loader.svg';
import loginImg from '../img/loginImg.jpg';
import Cookies from 'js-cookie';

const Login = () => {
  const [inputs, setInputs] = useState(
    {
      email: "",
      password: "",
    }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(selectUser);

  useEffect(() => {
    const { accessToken } = Cookies.get();
    if(!accessToken) {
      return;
    }
    if(isError) {
      toast.error(message, {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        pauseOnHover: false,
        autoClose: 1000
      });
    }
    if((isSuccess || user) && !user.role) {
      navigate("/");
    }
    if((isSuccess || user) && user.role == "admin") {
      navigate("/dashboard");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setInputs(prev=> ({
      ...prev,
      [e.target.name]: e.target.value // selected input change
    }));
  }

  const handleLoginAttempt = async (e) => {
    e.preventDefault();
    const data = {
      email: inputs.email,
      password: inputs.password,
    }
    dispatch(login(data));
  }

  return (
    <div className="container">
      <div className="login">
        <div className="content">
          <div className="layout">
            <div className="loginHeader">
              <h2>Welcome back to BookNow!</h2>
              <span>It's great to have you back!</span>
            </div>
            <form onSubmit={handleLoginAttempt} className="loginForm">
              <div className="input">
                <span>EMAIL</span>
                <input type="text" placeholder="e.g. andreasxyz@gmail.com" name="email" onChange={handleChange}/>
              </div>
              <div className="input">
                <span>PASSWORD</span>
                <input type="password" placeholder="Your password..." name="password" onChange={handleChange}/>
              </div>
              {isError && <p className="errorMsg">Invalid email or password</p>}
              <div className="formBtns">
                <button className="loginBtn" onClick={handleLoginAttempt}>Login</button>
                <button className="registerBtn">
                  <Link className="newAccountLink" to="/register"/>
                  Create Account
                </button>
              </div>
            </form>
          </div>
          <div className="loginImg">
            <img src={loginImg} alt="loginImg" className="imgLoginHotel"></img>
          </div>
          {isLoading && <div className='loader-sec'>
              <img src={loader}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login;