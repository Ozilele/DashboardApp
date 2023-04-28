import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { bookingsData, lineChartLabels, lineChartOptions, newUsersData } from '../../../utils/datatablesrc';


const AreaChart = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const bookData = {
    labels: lineChartLabels,
    datasets: [
      {
        label: 'Bookings',
        fill: true,
        data: bookingsData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }

  const usersData = {
    labels: lineChartLabels,
    datasets: [
      {
        label: 'New Users',
        fill: true,
        data: newUsersData,
        borderColor: '#865DFF',
        backgroundColor: '#E384FF',
      }
    ]
  }

  return (
    <div className="chart__sec">
      <div className="area__chart">
        <Line data={bookData} options={lineChartOptions} />
        <Line data={usersData} options={lineChartOptions} />
      </div>
    </div>
  )
}

export default AreaChart