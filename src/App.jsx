import { useState, useEffect } from 'react';
import './App.css';
import WeatherTable from '@functional/WeatherTable/WeatherTable';
import WeatherChart from '@design/WeatherChart/WeatherChart';
import Geolocation from '@functional/Geolocation/Geolocation';
import FavoriteCities from '@functional/FavoriteCities/FavoriteCities';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleCityChange = (e) => setCity(e.target.value);

  const addCityToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeCityFromFavorites = (cityToRemove) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== cityToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleFavoriteClick = async (favoriteCity) => {
    setCity(favoriteCity); // Update de zoekbalk
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${favoriteCity}&language=en&count=1`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { latitude, longitude } = data.results[0];
        setCoordinates({ latitude, longitude });
      } else {
        setError('Stad niet gevonden.');
      }
    } catch (error) {
      setError('Er is een fout opgetreden.');
    }

    setLoading(false);
  };

  const fetchCoordinates = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&count=1`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { latitude, longitude } = data.results[0];
        setCoordinates({ latitude, longitude });
      } else {
        setError('Stad niet gevonden.');
      }
    } catch (error) {
      setError('Er is een fout opgetreden.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!coordinates) return;
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Brussels`
        );
        const data = await response.json();
        setWeatherData(data.daily);
      } catch (error) {
        setError('Fout bij ophalen weerdata.');
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [coordinates]);

  return (
    <div className="App">
      <Geolocation setCoordinates={setCoordinates} />
      <input type="text" value={city} onChange={handleCityChange} placeholder="Voer een stad in" />
      <button onClick={fetchCoordinates} disabled={loading}>Zoek Stad</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Voeg knop toe om huidige stad aan favorieten toe te voegen */}
      {city && !favorites.includes(city) && (
        <button onClick={() => addCityToFavorites(city)}>Voeg {city} toe aan favorieten</button>
      )}

      {weatherData && <WeatherChart weatherData={weatherData} />}
      {weatherData && <WeatherTable weatherData={weatherData} city={city} />}
      
      <h3>Favorieten</h3>
      <FavoriteCities
        favorites={favorites}
        onFavoriteClick={handleFavoriteClick}
        onRemoveFavorite={removeCityFromFavorites}
      />
    </div>
  );
}

export default App;
