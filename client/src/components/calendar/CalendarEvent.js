import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, resetSuccess, selectModalData } from '../../features/appSlice';
import CallIcon from '@mui/icons-material/Call';
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import { setModalData, toggleModalWindow } from '../../features/appSlice';
import './CalendarEvent.css';

const CalendarEvent = ({ id ,Icon ,date, time, meetingName, loc, desc }) => {

  const modalData = useSelector(selectModalData);
  const dispatch = useDispatch();
  let icon;
  switch(Icon) {
    case "Call": 
      icon = <CallIcon className="event__icon"/>
      break;
    case "VideoChat":
      icon = <VideoChatOutlinedIcon className="event__icon"/>
      break;
    case "Delegation":
      icon = <WorkOutlinedIcon className="event__icon"/>
      break;
    case "OfficeMeeting":
      icon= <MeetingRoomOutlinedIcon className="event__icon"/>
      break;
    default:
      return;
  }

  const handleUpdateEvent = (e) => {
    dispatch(setModalData({
      name: Icon,
      date: date,
      time: time,
      meetingName: meetingName,
      localization: loc,
      desc: desc,
    }));
    dispatch(toggleModalWindow());
  }
  
  const handleDeleteEvent = (e) => {
    dispatch(deleteEvent(id));
    dispatch(resetSuccess());
  }

  return (
    <div className="calendar__event">
      {/* <Icon className="event__icon" /> */}
      {icon}
      <div className="calendar__event__content">
        <h3>{meetingName}</h3>
        <p className="hour">{time}{" "}- <span>{loc}</span></p>
        <p>{desc}</p>
      </div>
      <div className="calendar__event__btns">
        <button onClick={handleUpdateEvent} className="event__calendar__update__btn"> <EditIcon className="update__event"/> </button>
        <button onClick={handleDeleteEvent} className="event__calendar__delete__btn"> <DeleteIcon className='delete__event'/> </button>
      </div>
    </div>
  )
}

export default CalendarEvent;