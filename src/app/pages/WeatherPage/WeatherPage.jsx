import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WeatherTable from '@functional/WeatherTable/WeatherTable';
import WeatherChart from '@design/WeatherChart/WeatherChart';
import FavoriteCities from '@functional/FavoriteCities/FavoriteCities';
import { fetchCoordinates, fetchWeatherData, useFavorites } from '@functional/WeatherHelpers/WeatherHelpers'; 
import './WeatherPage.css';

function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [favorites, setFavorites] = useFavorites();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const cityFromUrl = queryParams.get('city');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (cityFromUrl) {
      setCity(cityFromUrl);
      handleCityFetch(cityFromUrl);
    }
  }, [cityFromUrl]);

  const handleCityFetch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await fetchCoordinates(city);
      setCoordinates(coords);
    } catch (error) {
      setError('Stad niet gevonden');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!coordinates) return;
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(coordinates);
        setWeatherData(data);
      } catch (error) {
        setError('Fout bij ophalen weerdata.');
      }
      setLoading(false);
    };
    fetchWeather();
  }, [coordinates]);

  const addCityToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
    }
  };

  const removeCityFromFavorites = (cityToRemove) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== cityToRemove);
    setFavorites(updatedFavorites);
  };

  const handleFavoriteClick = async (favoriteCity) => {
    setCity(favoriteCity);
    navigate(`/weather?city=${favoriteCity}`);
  };

  return (
    <div className="WeatherPage">
      <h1>Weer voor {city}</h1>

      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Voer een stad in" 
      />
      <button onClick={() => handleCityFetch(city)} disabled={loading}>Zoek Stad</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {city && !favorites.includes(city) && (
        <button onClick={() => addCityToFavorites(city)}>Voeg {city} toe aan favorieten</button>
      )}

      {loading && <p>Loading...</p>}

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

export default WeatherPage;
