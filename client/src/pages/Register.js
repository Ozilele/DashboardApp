import React, { useState } from 'react'
import './Register.css';
import registerImg from '../img/registerImg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { selectUser } from '../features/auth/authSlice';
import { useEffect } from 'react';

const Register = () => {
  const [err, setError] = useState(null);
  const [inputs, setInputs] = useState(
    {
      first_name: "",
      second_name: "",
      email: "",
      password: "",
    }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isError, isSuccess, isLoading, message } = useSelector(selectUser);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
    if(isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setInputs(prev=> ({
      ...prev,
      [e.target.name]: e.target.value // selected input change
    }));
  }

  const handleRegister = async e => {
    e.preventDefault();
    const userData = {
      firstName: inputs.first_name,
      secondName: inputs.second_name,
      email: inputs.email,
      password: inputs.password,
    }
    dispatch(register(userData));
  }

  return (
    <div className="registerContainer">
      <div className="register">
        <div className="register_content">
          <div className="register_layout">
            <div className="registerHeader">
              <h2>Join us now</h2>
              <span>Our community is awaiting you!</span>
            </div>
            <form className="registerForm">
              <div className="register_input">
                <span>First Name</span>
                <input required type="text" placeholder="e.g. John"  name="first_name" onChange={handleChange}/>
              </div>
              <div className="register_input">
                <span>Second Name</span>
                <input required type="text" placeholder="e.g. Bravo" name="second_name" onChange={handleChange}/>
              </div>
              <div className="register_input">
                <span>EMAIL</span>
                <input required type="email" placeholder="e.g. andreasxyz@gmail.com" name="email" onChange={handleChange}/>
              </div>
              <div className="register_input">
                <span>PASSWORD</span>
                <input required type="password" placeholder="Your password..." name="password" onChange={handleChange}/>
              </div>
              {err && <p>{err}</p>}
              <div className="register_formBtns">
                <button className="register_btn" onClick={handleRegister}>Register</button>
                <span>Do you have an account? <Link to="/login">Login</Link></span>
              </div>
            </form>
          </div>
          <div className="registerImg">
            <img src={registerImg} alt="registerImg" className="img_reg_Hotel"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register