import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GroupIcon from '@mui/icons-material/Group';
import Grid from '@mui/material/Grid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FeaturedChart from '../../../components/charts/FeaturedChart';
import DashboardChart from '../../../components/charts/DashboardChart';
import Widget from '../../../components/widgets/Widget';
import DashboardTable from '../../../components/table/DashboardTable';

const Dashboard = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [usersCount, setUsersCount] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUsersCount = async () => {
      try {
        const response = await axiosPrivate.get("/admin/users/count");
        return response.data;
      } catch(err) {
        console.log(err);
      }
    }
    const getBookings = async () => {
      try {
        const response = await axiosPrivate.get("/admin/bookings");
        if(response.status === 200) {
          return response.data;
        }
      } catch(err) {
        console.log(err);
      }
    }

    async function getDashboardData() {
      console.time("save-data");
      const data = await Promise.all([getUsersCount(), getBookings()]);
      setUsersCount(data[0].count);
      setBookingsCount(data[1].count);
      setBookings(data[1].bookings.map((booking) => {
        return {
          bookingId: booking._id,
          hotelId: booking.hotel,
          userId: booking.user,
          isPaid: booking.isPaid,
          amount: booking.amount,
          date: new Date(booking.createdAt).toLocaleString(),
        }
      }));
      setIsDataLoaded(true);
      console.timeEnd('save-data');
    }
    getDashboardData();
  }, []);

  return (
    <div className="dashboard__content">
      <Grid style={{ marginTop: "1.25rem" }} className="dashboard__grid" container rowSpacing={{lg: 0, md: 2, xs: 4}} columnSpacing={{ lg: 1, md: 2, sm: 2}}>
        <Grid className="dashboard__grid-item" item lg={3} md={5} sm={6} xs={12}>
          <Widget title="Earnings" percent={25} Icon={MonetizationOnIcon} message="View net earnings" number={'$37,256.78'} isUp={true} iconColor={'#AACB73'} />
        </Grid>
        <Grid className="dashboard__grid-item" item lg={3} md={5} sm={6} xs={12}>
          <Widget title="Bookings" percent={7} Icon={BookOnlineIcon} message="View all bookings" number={bookingsCount} isUp={false} iconColor={'#E4C988'} />
        </Grid>
        <Grid className="dashboard__grid-item" item lg={3} md={5} sm={6} xs={12}>
          <Widget title="Users" percent={4} Icon={GroupIcon} message="View all users" number={usersCount} isUp={true} iconColor={'#8EA7E9'} />
        </Grid>
        <Grid className="dashboard__grid-item" item lg={3} md={5} sm={6} xs={12}>
          <Widget title="Balance" percent={1} Icon={AccountBalanceWalletIcon} message="See details" number={'1,234,567.22'} isUp={true} iconColor={'#A084DC'} />
        </Grid>
      </Grid>
      <div className="dashboard__charts">
        <FeaturedChart />
        <DashboardChart aspect={2 / 1} title="Last 6 Months (Bookings)"/>
      </div>
      <div className="list__container">
        {/* <div className="list__title">Latest Bookings</div> */}
        {isDataLoaded && <DashboardTable bookings={bookings}/> }
      </div>
    </div>
  )
}

export default Dashboard;
