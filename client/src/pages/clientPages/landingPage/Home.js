import React, { useState } from 'react';
import './Home.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'; // external component for selecting the date
import SearchIcon from '@mui/icons-material/Search';
import accomodationIcon from '../../../img/search_1_icon.png';
import calendar from '../../../img/calendar.png';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import TopOffers from '../../../components/client/landingPage/TopOffers';
import FilterBoxOptions from '../../../components/client/landingPage/FilterBoxOptions';
import Destinations from '../../../components/client/landingPage/Destinations';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FeatureItem from '../../../components/client/items/FeatureItem';
import ClientReviewSlider from '../../../components/client/landingPage/ClientReviewSlider';

const features = [
  {
    title: "15000 Hotels",
    icon: <HotelIcon/>,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "10000000+ Customer",
    icon: <PeopleAltIcon/>,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "Helpful Staff",
    icon: <SupportAgentIcon/>,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
]

const featuresSecVariants = {
  hidden: {
    opacity: 0,
    y: "30px"
  },
  shown: {
    opacity: 1,
    y: "0",
    transition: {
      delay: 0.45,
      ease: [0.17, 0.67, 0.83, 0.67],
      staggerDirection: 1,
    }
  }
}


const Home = () => {

  const [input, setInput] = useState({
    country: '',
  });
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [dateIsVisible, setDateIsVisible] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  
  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  }

  const handleBtn = (value, action) => {
    setOptions((prev) => {
      return {
        ...prev,
        [value]: action === 'i' ? options[value]++ : options[value]--,
      }
    });
  }

  const handleInput = (e) => {
    setInput((prev) => {
      return ({
        ...prev,
        [e.target.name]: e.target.value,
      })
    })
  } 

  return (
    <>
      <div className="landingPageTop">
        <div className='landingPageBg'>
          <motion.div
            initial={{ y: "-20px", transform: "translateX(-100%)" }}
            animate={{ y: "0", transform: "translateX(0%)" }}
            transition={{ duration: 0.5 }}
            className="homeContent">
              <h2>Unlock your dreams with us<br></br>We are here for you!</h2>
          </motion.div>
          <button className='exploreNowBtn'>Explore Now</button>
          <div className="filterBox">
            <div className="filterSearchItem">
              <img src={accomodationIcon} alt="search_icon"></img>
              <input onChange={handleInput} name="country" type="text" placeholder="Where do you want to go?" className="searchInput"></input>
            </div>
            <div className="filterSearchItem">
              <img src={calendar} alt="calendar"></img>
              <span onClick={()=> setDateIsVisible(!dateIsVisible)} className="searchtxt">{`${formatDate(date[0].startDate)}`} to {`${formatDate(date[0].endDate)}`}</span>
              {dateIsVisible && 
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="datePicker"
                />}
            </div>
            <div className="filterSearchItem">
              <img src={calendar} alt="options"></img>
              <span onClick={()=>setOpenOptions(!openOptions)} className="searchtxt">{`${options.adult} adult • ${options.children} children • ${options.room} room`}</span>
              {openOptions && <FilterBoxOptions options={options} handleBtn={handleBtn}/>}
            </div>
            <div className="filterSearchItem filterSearchItemBtn">
              <Link to="/hotels">
                <IconButton style={{ background: "#0D1282" }}>
                  <SearchIcon style={{ width: '22px', height: '22px', color: "whitesmoke" }}/>
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <TopOffers/>
      <Destinations/>
      <div className='landingPage-Features'>
        <motion.h3
          initial={{ transform: "translateX(-100%)", y: "30px", scaleY: 0.9 }}
          whileInView={{ transform: "translateX(0%)", y: "0", scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28, type: "spring", bounce: 0.25 }}
        >
          Why Us?
        </motion.h3>
        <div className='landingPage-Features-box'></div>
        <motion.div
          className='landingPage-Features-Content'>
          {features.map((feature, i) => {
            return (
              <FeatureItem
                key={i}
                index={i}
                title={feature.title}
                icon={feature.icon}
                desc={feature.desc}
              />
            )
          })}
        </motion.div>
      </div>
      <div className='landingPage-Reviews'> 
        <h3>Client Reviews</h3>
        <ClientReviewSlider/>
      </div>
    </>
  )
}

export default Home;