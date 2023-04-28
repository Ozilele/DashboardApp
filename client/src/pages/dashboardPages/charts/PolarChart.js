import React from 'react'
import './LineChart.css';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';


const PolarChart = () => {

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Security', 'Friendly Interface', 'Fast payments', 'Accessibility on all devices', 'Intuitive chatbots', 'Helpul Staff'],
    datasets: [
      {
        label: '# of Votes',
        data: [11, 24, 12, 16, 20, 17],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart__sec">
      <div className="polar__chart">
        <h2>What do you find the best in our service?</h2>
        <PolarArea data={data} />
      </div>
    </div>
  )
}

export default PolarChart