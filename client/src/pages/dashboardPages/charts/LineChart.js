import React from 'react'
import './LineChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { bookingsData, lineChartLabels, lineChartOptions, newUsersData } from '../../../utils/datatablesrc';
import { Line } from 'react-chartjs-2';

const LineChart = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: lineChartLabels,
    datasets: [
      {
        label: 'Bookings',
        data: bookingsData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'New Users',
        data: newUsersData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className="chart__sec">
      <div className="line__chart">
        <Line options={lineChartOptions} data={data}/>
      </div>
    </div>
  )
}

export default LineChart;