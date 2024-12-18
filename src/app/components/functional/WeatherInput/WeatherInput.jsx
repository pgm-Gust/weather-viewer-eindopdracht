import React from 'react';

const WeatherInput = ({ city, onCityChange, onSearch, loading }) => {
  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={onCityChange}
        placeholder="Voer een stad in"
      />
      <button onClick={onSearch} disabled={loading}>
        Zoek Stad
      </button>
    </div>
  );
};

export default WeatherInput;
