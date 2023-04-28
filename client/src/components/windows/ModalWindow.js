import React, { useState } from 'react'
import './ModalWindow.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { toggleModalWindow, addNewEvent } from '../../features/appSlice';

const ModalWindow = ({ name, date, time, meetingName, localization, desc }) => {

  const [eventTime, setEventTime] = useState('');
  const [inputs, setInputs] = useState({
    meetingName: '',
    localization: '',
    description: ''
  });
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleModalWindow());
  }

  const handleInputChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev, 
        [e.target.name] : e.target.value
      }
    });
  }

  const handleNewEvent = (e) => {
    e.preventDefault();
    const newEventObj = {
      date: date,
      time: eventTime.$d.toString().slice(16, 21),
      data: {
        name: inputs.meetingName,
        localization: inputs.localization,
        description: inputs.description,
      }
    }
    dispatch(addNewEvent(newEventObj));
    closeModal();
  };

  return (
    <div className="modalEventWindow">
      <div className="modalTop">
        <div>
          <CalendarMonthIcon className="calendar__icon"/>
          <h3 className="date__info">{date.toString()}</h3>
        </div>
        <CloseIcon onClick={closeModal} className="close__icon"/>
      </div>
      <form className="event__Form" onSubmit={handleNewEvent}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Time"
            value={eventTime}
            onChange={(newTime) => setEventTime(newTime)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="eventDetails">
          <div className="eventDetailsInput">
            <label>Meeting name</label>
            <input 
              onChange={handleInputChange} 
              value={meetingName ? meetingName : inputs.meetingName} 
              name="meetingName" 
              type="text">
            </input>
          </div>
          <div className="eventDetailsInput">
            <label>Localization</label>
            <input 
              name="localization"
              value={localization ? localization : inputs.localization}
              onChange={handleInputChange}
              type="text">
            </input>
          </div>
          <div className="eventDetailsInput">
            <label>Description</label>
            <input 
              name="description"
              value={desc ? desc : inputs.description}
              onChange={handleInputChange}
              type="text">
            </input>
          </div>
        </div>
        <div className="eventFormBtns">
          <button onClick={closeModal} className="cancel__btn">Cancel</button>
          <button onClick={handleNewEvent} className="meeting__btn" type="submit">Add meeting</button>
        </div>
      </form>
    </div>
  )
}

export default ModalWindow;