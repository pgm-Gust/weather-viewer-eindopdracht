import React from "react";
import "./SearchHistory.css";

function SearchHistory({ searchHistory, onCitySelect }) {
  return (
    <div className="search-history">
      <h2>Zoekgeschiedenis</h2>
      <ul>
        {searchHistory.map((city, index) => (
          <li key={index}>
            <button onClick={() => onCitySelect(city)}>{city}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
