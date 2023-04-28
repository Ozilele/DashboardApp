import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { popularCitiesData } from '../../../utils/datatablesrc';
import './LineChart.css';

const PieChart = () => {

  ChartJS.register(ArcElement, Tooltip, Legend);

  const citiesData = {
    labels: popularCitiesData,
    datasets: [
      {
        label: '% of most popular cities',
        data: [13, 17, 10, 8, 12, 13, 17, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="chart__sec">
      <div className="pie__chart">
        <Pie data={citiesData} /> 
      </div>
    </div>
  )
}

export default PieChart