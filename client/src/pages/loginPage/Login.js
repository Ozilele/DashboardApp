import React, {useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuth } from '../../features/auth/authSlice';
import './Login.css';
import loader from '../../img/loader.svg';
import loginImg from '../../img/loginImg.jpg';

const Login = () => {
  const emailRef = useRef();
  const errorRef = useRef();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(selectAuth);
  
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if(isError) { // error message
      toast.error(message, {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        pauseOnHover: false,
        autoClose: 1000
      });
    }
    if((isSuccess || user) && !user.role) { // normal user
      if(user.accessToken) {
        navigate("/");
      }
    }
    if((isSuccess || user) && user.role === "admin") { // admin user
      if(user.accessToken) {
        navigate("/dashboard");
      }
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
    setInputs({
      email: "",
      password: "",
    });
    const data = {
      email: inputs.email,
      password: inputs.password,
    }
    dispatch(login(data)); // try to log in - redux authSlice
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
                <input
                  ref={emailRef} 
                  type="text" 
                  placeholder="e.g. andreasxyz@gmail.com" 
                  name="email"
                  value={inputs.email} 
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <span>PASSWORD</span>
                <input 
                  type="password" 
                  placeholder="Your password..." 
                  name="password"
                  value={inputs.password}  
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
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
          {isLoading && 
            <div className='loader-sec'>
              <img src={loader}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login;