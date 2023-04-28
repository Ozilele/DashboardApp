import { Avatar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import DashboardChart from '../../../components/charts/DashboardChart';
import DashboardTable from '../../../components/table/DashboardTable';
import { selectUser } from '../../../features/userSlice';
import './User.css';

const User = () => {

  // const { id } = useParams();
  const user = useSelector(selectUser);

  return (
    <>
    <div className="user__section">
      <button className="edit__usr__btn">Edit</button>
      <div className="user__profile">
        <Avatar className="user__avatar" src={user.imgSrc}/>
        <div className="user__info">
          <h3>{user?.fullName}</h3>
          <p>Email:{" "}<span>{user?.email}</span></p>
          <p>Age:{" "}<span>{user?.age}</span></p>
          <p>Status: <span className={`info ${user?.status}`}>{user?.status}</span></p>
        </div>
      </div>
      <div className="user__chart">
        <DashboardChart aspect={2 / 1} title="User Bookings (Last 6 Months)" />
      </div>
    </div>
    <div className="user__bottom__section">
      <h4>Latest Bookings</h4>
      <DashboardTable/>
    </div>
    </>
  )
}

export default User