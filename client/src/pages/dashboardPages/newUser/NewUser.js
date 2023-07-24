import React, { useState } from 'react'
import './NewUser.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { convertToBase64 } from '../../../utils/helpers.js'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

const initialInputs = {
  imageFile: "",
  firstName: "",
  secondName: "",
  email: "",
  password: "",
  passwordRepeat: "",
};

const NewUser = () => {

  const [error, setError] = useState(false);
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState(initialInputs);
  const navigate = useNavigate();

  const addNewUser = async (e) => {
    console.log(file);
    e.preventDefault();
    setError(false);
    if(inputs.password !== inputs.passwordRepeat) {
      setError(true);
      return;
    } else {
      let fileData;
      try {
        fileData = await convertToBase64(file);
      } catch(err) {
        console.log(err);
      }
      const API_URL = `/admin/users`;
      axios.post(API_URL, {
        firstName: inputs.firstName,
        secondName: inputs.secondName,
        email: inputs.email,
        password: inputs.password,
        imageData: fileData.data,
        imageName: fileData.name,
      }).then(res => {
        console.log(res);
        setInputs(initialInputs);
        if(res.status === 201) {
          navigate("/dashboard/users");
        }
      })
      .catch(err => {
        setError(true);
        toast.error(err.response.data.message, {
          position: 'top-right',
          theme: 'colored',
          hideProgressBar: true,
          pauseOnHover: false,
          autoClose: 1000,
        });
        setInputs(initialInputs);
      }); 
    }
  }

  const handleInput = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  return (
    <div className="new__user__section">
      <div className="new__user__top"><h2>Add New User</h2></div>
      <div className="new__user__content">
        <div className="new__user__left">
          <img src={file ? URL.createObjectURL(file) : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" } alt="newUser_img"></img>
        </div>
        <div className="new__user__right">
          <form onSubmit={addNewUser} className="new__user__form">
            <div className="formInput">
              <div className="formInput__img">
                <label className="file__label" htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input name='imageFile' onChange={e => { setFile(e.target.files[0]); handleInput(e)}} type="file" id="file" style={{ display: 'none' }}/>
              </div>
            </div>
            <div className="formInput">
              <label htmlFor='text'>Name</label>
              <input name="firstName" onChange={handleInput} type="text" placeholder='John'></input>
            </div>
            <div className="formInput">
              <label>Email</label>
              <input name="email" onChange={handleInput} type="email" placeholder='ziutek@gmail.com'></input>
            </div>
            <div className="formInput">
              <label>Second Name</label>
              <input name="secondName" type="text" onChange={handleInput} placeholder='Pietruszka'></input>
            </div>
            <div className="formInput">
              <label>Password</label>
              <input name='password' type="password" onChange={handleInput}></input>
            </div>
            <div className="formInput">
              <label>Repeat Password</label>
              <input name='passwordRepeat' type="password" onChange={handleInput}></input>
            </div>
            {error && <p style={{ color: '#D71313', textDecoration: 'underline' }}>Error adding a user</p>}
            <div className="send__section">
              <button onClick={addNewUser} className="send__btn">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewUser;