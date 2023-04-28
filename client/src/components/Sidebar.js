import React from 'react';
import './Sidebar.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { IconButton } from '@mui/material';
import SidebarOption from './SidebarOption';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TiEdit } from 'react-icons/ti';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { TbColorPicker } from 'react-icons/tb';
import PollIcon from '@mui/icons-material/Poll';
import { BiNetworkChart } from 'react-icons/bi';
import { AiOutlineLineChart, AiOutlineAreaChart } from 'react-icons/ai';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebar, toggleSidebar } from '../features/appSlice';

const Sidebar = () => {

  const sidebarRolled = useSelector(selectSidebar);
  const dispatch = useDispatch();
  const sidebarClass = sidebarRolled ? 'sidebar__section__rolled' : 'sidebar__section';

  return (
    <div className={sidebarClass}>
      <div className="sidebar__logo">
        <IconButton onClick={() => dispatch(toggleSidebar())}>
          <ApartmentIcon/>
        </IconButton>
        <h2>BookNow</h2>
      </div>
      <div className="dashboard__section">
        <h3>Dashboard</h3>
        <SidebarOption name="Booking" Icon={DashboardIcon} path="/dashboard"/>
      </div>
      <div className="pages__section">
        <h3>Pages</h3>
        <SidebarOption name="Hotels" Icon={HotelIcon} path="/dashboard/hotels"/>
        <SidebarOption name="Bookings" Icon={BookIcon} path="/dashboard/bookings"/>
        <SidebarOption name="Users" Icon={PeopleIcon} path="/dashboard/users"/>
      </div>
      <div className="apps__section">
        <h3>Apps</h3>
        <SidebarOption name="Calendar" Icon={CalendarMonthIcon} path="/dashboard/calendar"/>
        <SidebarOption name="Kanban" Icon={ViewKanbanIcon} path="/dashboard/kanban"/>
        <SidebarOption name="Editor" Icon={TiEdit} path="dashboard/editor"/>
        <SidebarOption name="Color-Picker" Icon={TbColorPicker} path="/picker"/>
      </div>
      <div className="charts__section">
        <h3>Charts</h3>
        <SidebarOption name="Line" Icon={AiOutlineLineChart} path="/dashboard/charts/line"/>
        <SidebarOption name="Area" Icon={AiOutlineAreaChart} path="/dashboard/charts/area"/>
        <SidebarOption name="Pie" Icon={PieChartIcon} path="/dashboard/charts/pie"/>
        <SidebarOption name="Bar" Icon={BarChartIcon} path="/dashboard/charts/bar"/>
        <SidebarOption name="Scatter" Icon={ScatterPlotIcon} path="/dashboard/charts/scatter"/>
        <SidebarOption name="Polar" Icon={PollIcon} path="/dashboard/charts/polar"/>
        <SidebarOption name="Financial" Icon={BiNetworkChart} path="/dashboard/charts/financial"/>
      </div>
    </div>
  )
}

export default Sidebar