import React from 'react'
import './DashboardTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './DashboardTable.css';

const DashboardTable = () => {

  const rows = [
    {
      id: 122489,
      hotel: "Marriott",
      location: "Warsaw, Poland",
      client: "Joe Biden",
      date: "20 Feb",
      amount: "1500",
      method: "Blik",
      status: "approved",
    },    
    {
      id: 122112,
      hotel: "InterContinental",
      location: "Warsaw, Poland",
      client: "John Smith",
      date: "22 Feb",
      amount: "1250",
      method: "Online Payment",
      status: "pending",
    },
    {
      id: 102129,
      hotel: "Babie Lato",
      location: "Karpacz, Poland",
      client: "Nina Kowalczyk",
      date: "19 Jan",
      amount: "820",
      method: "Credit Card",
      status: "approved",
    },
    {
      id: 191099,
      hotel: "Luxer",
      location: "London, UK",
      client: "Ania Mądra",
      date: "29 Jan",
      amount: "950",
      method: "Online Payment",
      status: "pending",
    },    
    {
      id: 104489,
      hotel: "Montgomery",
      location: "Paris, France",
      client: "Niklas Sule",
      date: "21 March",
      amount: "560",
      method: "Blik",
      status: "approved",
    }
  ]

  return (
    <div className="table__row">
      <div className="list__title">Latest Bookings</div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead style={{ width: "100%" }}>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Hotel</TableCell>
              <TableCell className="tableCell">Location</TableCell>
              <TableCell className="tableCell">Client</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.hotel}</TableCell>
                <TableCell align="left" className="tableCell">{row.location}</TableCell>
                <TableCell className="tableCell">{row.client}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell style={{ color: row.status === "approved" ? "green" : "red"}} className="tableCell">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DashboardTable;