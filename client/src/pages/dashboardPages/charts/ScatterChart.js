import React from 'react'
import './LineChart.css';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { scatterData } from '../../../utils/datatablesrc';

const ScatterChart = () => {

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      }
    }
  }

  const scatData = {
    datasets: [
      {
        label: 'Average time spent by user(1 week)',
        data: scatterData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div className="chart__sec">
      <div className="scatter__chart">
        <Scatter options={options} data={scatData} />
      </div>
    </div>
  )
}

export default ScatterChart;