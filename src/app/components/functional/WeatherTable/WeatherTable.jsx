// src/app/components/functional/WeatherTable/WeatherTable.jsx
import React from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaMoon } from 'react-icons/fa';

const weatherIcons = {
  clear: <FaSun />,
  partly_cloudy: <FaCloud />,
  cloudy: <FaCloud />,
  rain: <FaCloudRain />,
  snow: <FaSnowflake />,
  night: <FaMoon />
};

const WeatherTable = ({ weatherData }) => {
  // We controleren of weatherData beschikbaar is voordat we proberen te renderen
  if (!weatherData || !weatherData.time) {
    return <p>Geen weerdata beschikbaar</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Datum</th>
          <th>Max Temp (°C)</th>
          <th>Min Temp (°C)</th>
          <th>Weer</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.time.map((date, index) => {
          const weatherCode = weatherData.weathercode ? weatherData.weathercode[index] : null;
          let weatherIcon;

          if (weatherCode === 0) weatherIcon = weatherIcons.clear; // Clear sky
          else if (weatherCode === 1 || weatherCode === 2) weatherIcon = weatherIcons.partly_cloudy; // Partly cloudy
          else if (weatherCode === 3) weatherIcon = weatherIcons.cloudy; // Cloudy
          else if (weatherCode === 51 || weatherCode === 53) weatherIcon = weatherIcons.rain; // Light Rain
          else if (weatherCode === 61 || weatherCode === 63) weatherIcon = weatherIcons.rain; // Moderate Rain
          else if (weatherCode === 71 || weatherCode === 73) weatherIcon = weatherIcons.snow; // Light Snow
          else weatherIcon = weatherIcons.night; // Default to night

          return (
            <tr key={index}>
              <td>{date}</td>
              <td>{weatherData.temperature_2m_max ? weatherData.temperature_2m_max[index] : 'N/A'}°C</td>
              <td>{weatherData.temperature_2m_min ? weatherData.temperature_2m_min[index] : 'N/A'}°C</td>
              <td>{weatherIcon}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WeatherTable;
