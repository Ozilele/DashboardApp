import React from 'react'
import './DashboardChart.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardChart = ({ aspect, title }) => {

  const data = [
    {
      name: 'January',
      bookings: 1567,
    },
    {
      name: 'February',
      bookings: 1452,
    },
    {
      name: 'March',
      bookings: 1359,
    },
    {
      name: 'April',
      bookings: 1756,
    },
    {
      name: 'May',
      bookings: 2178,
    },
    {
      name: 'June',
      bookings: 1303,
    }
  ];

  return (
  <div className="dashboard__chart">
    <div className="title">{title}</div>
    <ResponsiveContainer className="chart__bookings" width="100%" aspect={aspect}>
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="bookings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="gray"/>
        <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
        <Tooltip />
        <Area type="monotone" dataKey="bookings" stroke="#8884d8" fillOpacity={1} fill="url(#bookings)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}

export default DashboardChart