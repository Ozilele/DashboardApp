import React from 'react'
import './Dashboard.css';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GroupIcon from '@mui/icons-material/Group';
import Grid from '@mui/material/Grid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FeaturedChart from '../../../components/charts/FeaturedChart';
import DashboardChart from '../../../components/charts/DashboardChart';
import Widget from '../../../components/widgets/Widget';
import DashboardTable from '../../../components/table/DashboardTable';
import { Box } from '@mui/material';

const Dashboard = () => {

  return (
    <div className="dashboard__content">
      <Grid className="dashboard__grid" container rowSpacing={{lg: 0, md: 2, xs: 4}} columnSpacing={{lg: 1, md: 2, sm: 0}}>
        <Grid className="dashboard__grid-item" item lg={3} md={6} xs={12}>
          <Widget title="Earnings" percent={25} Icon={MonetizationOnIcon} message="View net earnings" number={'$37,256.78'} isUp={true} iconColor={'#AACB73'} />
        </Grid>
        <Grid className="dashboard__grid-item" item lg={3} md={6} xs={12}>
          <Widget title="Bookings" percent={7} Icon={BookOnlineIcon} message="View all bookings" number={'7,821'} isUp={false} iconColor={'#E4C988'} />
        </Grid>
        <Grid className="dashboard__grid-item" item lg={3} md={6} xs={12}>
          <Widget title="Users" percent={4} Icon={GroupIcon} message="View all users" number={'122,456.987'} isUp={true} iconColor={'#8EA7E9'} />
        </Grid>
        <Grid className="dashboard__grid-item" item lg={3} md={6} xs={12}>
          <Widget title="Balance" percent={1} Icon={AccountBalanceWalletIcon} message="See details" number={'1,234,567.22'} isUp={true} iconColor={'#A084DC'} />
        </Grid>
      </Grid>
      <div className="dashboard__charts">
        <FeaturedChart />
        <DashboardChart aspect={2 / 1} title="Last 6 Months (Bookings)"/>
      </div>
      <div className="list__container">
        {/* <div className="list__title">Latest Bookings</div> */}
        <DashboardTable/>
      </div>
  </div>
)
}

export default Dashboard;

// width: 100%;
// flex: 1 1;
// position: relative;
// margin-top: 10px;
// padding: 12px;
