import React, { useEffect, useState } from 'react'
import './CalendarApp.css';
import CalendarEvent from '../../../components/calendar/CalendarEvent';
import Calendar from '../../../components/calendar/Calendar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import loader from '../../../img/loader.svg';
import ModalWindow from '../../../components/windows/ModalWindow';
import { resetSuccess, selectApp, selectModal, selectModalData } from '../../../features/appSlice';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const CalendarApp = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);
  const { isSuccess, message } = useSelector(selectApp);
  const modalData = useSelector(selectModalData);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [sortBtnClicked, setSortBtnClicked] = useState(false);
  
  const calendarClassName = modal ? 'calendar__section__blurred' : 'calendar__section';
  const validDate = new Date(date.toISOString()).toLocaleDateString("pl-PL");
  
  const getEvents = async(signal) => {
    try {
      const response = await axiosPrivate.get(`/admin/calendar/date?currDate=${validDate}`, {
        signal: signal
      });
      console.log(response);
      setEventsData(response?.data?.events);
      setIsLoading(false); // stop loading
    } catch(err) {
      console.log(err);
      console.log(err?.status);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    setEventsData([]);
    setIsLoading(true);
    getEvents(controller.signal);

    return () => {
      controller.abort();
    }
  }, [date]);

  if(isSuccess) {
    toast.success(message, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
      hideProgressBar: true,
      pauseOnHover: false,
    });
    dispatch(resetSuccess());
    setIsLoading(true);
    getEvents();
  }

  return (
    <div className="calendar__app">
      <div className="calendar_header_container">
        <div className="calendar__header">
          <h2>Calendar</h2>
        </div>
      </div>
      <div className={calendarClassName}>
        <Calendar date={date} setDate={setDate} />
        <div className="calendar__content">
          <div className="calendar__content__header">
            <h2>Events</h2>
            <span>{validDate}</span>
            <button className="calendarSortBtn" onClick={(e) => setSortBtnClicked(!sortBtnClicked)}>
              <span>Sort By</span>
              <KeyboardArrowDownIcon className="sortArrowDown"/>
            </button>
          </div>
          {isLoading &&  <img className='loader-img' src={loader} alt="Loader"/>}
          {eventsData.map((event) => {
            return (
              <CalendarEvent
                key={event._id}
                id={event._id}
                Icon="Call" // to-do
                date={event.date}
                time={event.time}
                meetingName={event.data.name}
                loc={event.data.localization}
                desc={event.data.description}
              />
            )
          })}
        </div>
      </div>
      {modal && 
        <ModalWindow 
          name={modalData.name} 
          date={modalData.date}
          time={modalData.time}
          meetingName={modalData.meetingName}
          localization={modalData.localization}
          desc={modalData.desc}
        />
      }
    </div>
  )
}
export default CalendarApp;