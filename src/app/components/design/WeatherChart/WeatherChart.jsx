import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import './WeatherChart.css';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  zoomPlugin // Registreer de zoom plugin hier
);

const WeatherChart = ({ weatherData }) => {
  const chartData = {
    labels: weatherData?.time || [],
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: weatherData?.temperature_2m_max || [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Min Temp (°C)',
        data: weatherData?.temperature_2m_min || [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy', // Sta pannen toe voor zowel de x- als y-as
        },
        zoom: {
          enabled: true,
          mode: 'xy', // Sta zoomen toe voor zowel de x- als y-as
        },
      },
    },
  };

  return (
    <div className="weather-chart-container">
      <h2>Weersvoorspelling</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherChart;
