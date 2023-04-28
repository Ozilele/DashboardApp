import axios from 'axios';
import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './UserSettings.css';

const UserSettings = () => {

  const state = useLocation();
  const id = state.pathname.split("/")[2].slice(1);
  const [success, setSuccess] = useState(null);
  const [err, setError] = useState(null);
  const [inputs, setInputs] = useState(
    {
      first_name: "",
      email: "",
      currPassword: "",
      currPassword_del: "",
      newPassword: "",
      newPasswordRepeat: "",
      id: id,
    }
  );

  const navigate = useNavigate();

  const handleInput = (e) => {
    setInputs(prev=> ({
      ...prev,
      [e.target.name]: e.target.value // selected input change
    }));
  }

  const updateBtn = async(e) => {
    e.preventDefault();
    try {
      const firstCheck = await axios.post("http://localhost:8000/server/users/checkOldPassword", inputs);

      if(firstCheck.status == 200) {
        try {
          const req = await axios.put(`http://localhost:8000/server/users/updateUserData/${id}`, inputs);
          setError(null);
          setSuccess(req.data.message);
          setInputs((prev) => ({
            ...prev,
            currPassword: "",
            newPassword: "",
            newPasswordRepeat: "",
          }));
        } catch(err) {
          setError(err.response.data.message);
        } 
      }
    }
    catch(err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }

  const deleteAccount = async(e) => {
    e.preventDefault();
    try {
      const firstCheck = await axios.post("http://localhost:8000/server/users/checkOldPassword", inputs);
      console.log(firstCheck);
      if(firstCheck.status == 200) {
        try {
          const req = await axios.post(`http://localhost:8000/server/users/deleteUserAccount/${id}`, inputs);
          localStorage.removeItem("user");
          localStorage.setItem("user", null);
          navigate("/");
        }
        catch(err) {
          setError(err.response.data.message);
        }
      }
    }
    catch(err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <div className="settingsForm">
      <form>
        <h2>Settings</h2>
        <div className="settingsInput">
          <label>Your current password:</label>
          <input value={inputs.currPassword} name="currPassword" type="password" onChange={handleInput}></input>
        </div>
        <div className="settingsInput">
          <label>New password:</label>
          <input value={inputs.newPassword} name="newPassword" type="password" onChange={handleInput}></input>
        </div>
        <div className="settingsInput">
          <label>Repeat new password:</label>
          <input value={inputs.newPasswordRepeat} name="newPasswordRepeat" type="password" onChange={handleInput}></input>
        </div>
        {err && <p className="err">{err}</p>}
        {success && <p className="success">{success}</p>}
        <button className="setBtn" onClick={updateBtn}>Update</button>
      </form>
      <form className="deleteAccForm">
        <h2>Delete account</h2>
        <div className="settingsInput">
          <label>First name:</label>
          <input value={inputs.first_name} name="first_name" type="text" onChange={handleInput}></input>
        </div>
        <div className="settingsInput">
          <label>Email:</label>
          <input value={inputs.email} name="email" type="text" onChange={handleInput}></input>
        </div>
        <div className="settingsInput">
          <label>Your current password:</label>
          <input value={inputs.currPassword_del} name="currPassword_del" type="password" onChange={handleInput}></input>
        </div>
          {err && <p className="err">{err}</p>}
          {success && <p className="success">{success}</p>}
        <button className="deleteBtn" onClick={deleteAccount}>Delete Account</button>
      </form>
    </div>
  )
}

export default UserSettings;
