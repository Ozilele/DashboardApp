import React, { useState } from 'react'
import './NewUser.css';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

const NewUser = () => {

  const [file, setFile] = useState("");

  return (
    <div className="new__user__section">
      <div className="new__user__top"><h2>Add New User</h2></div>
      <div className="new__user__content">
        <div className="new__user__left">
          <img src={file ? URL.createObjectURL(file) : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" } alt="newUser_img"></img>
        </div>
        <div className="new__user__right">
          <form className="new__user__form">
            <div className="formInput">
              <div className="formInput__img">
                <label className="file__label" htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input onChange={e => setFile(e.target.files[0])} type="file" id="file" style={{ display: 'none' }}/>
              </div>
            </div>
            <div className="formInput">
              <label>Username</label>
              <input type="text" placeholder='Kusia_z'></input>
            </div>
            <div className="formInput">
              <label>Name and surname</label>
              <input type="text" placeholder='John Doe'></input>
            </div>
            <div className="formInput">
              <label>Email</label>
              <input type="email" placeholder='ziutek@gmail.com'></input>
            </div>
            <div className="formInput">
              <label>Phone</label>
              <input type="text" placeholder='345 567 892'></input>
            </div>
            <div className="formInput">
              <label>Password</label>
              <input type="password"></input>
            </div>
            <div className="formInput">
              <label>Country</label>
              <input type="text" placeholder='Poland'></input>
            </div>
            <div className="formInput">
              <label>Address</label>
              <input type="text" placeholder='Wall Street 21 NY'></input>
            </div>
            <div className="send__section">
              <button className="send__btn">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewUser