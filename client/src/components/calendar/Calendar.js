import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import SpeedDial from '@mui/material/SpeedDial';
import CallIcon from '@mui/icons-material/Call';
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import './Calendar.css';
import { useDispatch } from 'react-redux';
import { setModalData, toggleModalWindow } from '../../features/appSlice';

const Calendar = ({ date, setDate }) => {

  const [highlightedDays, setHighlightedDays] = useState([1, 2, 6, 15]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const actions = [
    {
      id: 1,
      icon: <CallIcon/>,
      name: 'Call'
    },
    {
      id: 2,
      icon: <VideoChatOutlinedIcon/>,
      name: 'VideoChat'
    },
    {
      id: 3,
      icon: <MeetingRoomOutlinedIcon/>,
      name: 'OfficeMeeting'
    },
    {
      id: 4,
      icon: <WorkOutlinedIcon/>,
      name: 'Delegation'
    }
  ];

  return (
    <div className="first__calendar__sec">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.date()) >= 0;

            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <CheckIcon className="check__badge__icon" style={{color: "whitesmoke"}}/> : undefined}
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 13, right: 13 }}
            icon={<SpeedDialIcon />}
            onClose={() => { setIsOpen(false) }}
            onOpen={() => { setIsOpen(true) }}
            open={isOpen}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.id}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(e) => {
                  setIsOpen(false);
                  dispatch(setModalData({
                    name: action.name,
                    date: new Date(date.toISOString()).toLocaleDateString("pl-PL"),
                  }));
                  dispatch(toggleModalWindow());
                }}
              />
            ))}
          </SpeedDial>
      </LocalizationProvider>
    </div>
  )
}

export default Calendar;