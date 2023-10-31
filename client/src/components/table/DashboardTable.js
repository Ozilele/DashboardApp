import React, { useEffect, useState } from 'react';
import './DashboardTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../api/axios';

const DashboardTable = ({ bookings }) => {

  const [bookingsDataLoaded, setIsLoaded] = useState(false);
  const [dashboardBookings, setBookings] = useState([]);

  useEffect(() => {
    const getInfoOfBooking = async () => {
      const hotelIds = bookings.map((booking) => booking.hotelId);
      const urls = hotelIds.map((hotelId) => `/api/client/hotel/${hotelId}`);
      const promises = urls.map(async (url) => {
        return axios.get(url).then((res) => {
          return res.data.hotel;
        });
      });
      const hotelData = await Promise.all(promises);
      bookings = bookings.map((booking, index) => {
        return {
          ...booking,
          hotelName: hotelData[index].name,
          hotelLocation: `${hotelData[index].localization.city}, ${hotelData[index].country}`,
        }
      });
      setBookings(bookings);
      setIsLoaded(true);
    }
    getInfoOfBooking();
  }, []);

  return (
    <div className="table__row">
      <div className="list__title">Latest Bookings</div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead style={{ width: "100%" }}>
            <TableRow>
              <TableCell className="tableCell">Booking ID</TableCell>
              <TableCell className="tableCell">Hotel</TableCell>
              <TableCell className="tableCell">Location</TableCell>
              <TableCell align='center' className="tableCell">Client</TableCell>
              <TableCell align='center' className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingsDataLoaded && dashboardBookings.map((row) => {
              return (
                <TableRow key={row?.bookingId}>
                  <TableCell className="tableCell">{row?.bookingId}</TableCell>
                  <TableCell className="tableCell">{row?.hotelName}</TableCell>
                  <TableCell align="left" className="tableCell">{row.hotelLocation}</TableCell>
                  <TableCell className="tableCell">{row?.userId}</TableCell>
                  <TableCell className="tableCell">{row?.date}</TableCell>
                  <TableCell align='center' className="tableCell">{row?.amount}$</TableCell>
                  <TableCell align='center' style={{ color: row?.isPaid === true ? "green" : "red"}} className="tableCell">{row?.isPaid === true ? "paid" : "unpaid"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DashboardTable;