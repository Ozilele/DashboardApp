import React from 'react'
import './LineChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { bookingsData, lineChartLabels, bookingsData2k21 } from '../../../utils/datatablesrc';

const BarChart = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bookings by Year Bar Chart',
      },
    },
  };

  const data = {
    labels: lineChartLabels,
    datasets: [
      {
        label: 'Bookings 2022',
        data: bookingsData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Bookings 2021',
        data: bookingsData2k21,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }

  return (
    <div className="chart__sec">
      <div className="bar__chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default BarChart