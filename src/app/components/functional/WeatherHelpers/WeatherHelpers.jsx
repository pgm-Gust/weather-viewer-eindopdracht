// weatherHelpers.js
export const fetchCoordinates = async (city) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&count=1`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { latitude, longitude } = data.results[0];
      return { latitude, longitude };
    } else {
      throw new Error('Stad niet gevonden');
    }
  };
  
  export const fetchWeatherData = async (coordinates) => {
    const { latitude, longitude } = coordinates;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Brussels`
    );
    const data = await response.json();
    return data.daily;
  };
  
  // Custom hook voor favorieten (het laden uit localStorage)
  import { useState } from 'react';
  
  export const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
  
    return [favorites, setFavorites];
  };
  