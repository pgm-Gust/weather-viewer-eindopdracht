import React from 'react';

function FavoriteCities({ favorites, onFavoriteClick, onRemoveFavorite }) {
  return (
    <div>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <button onClick={() => onFavoriteClick(city)}>{city}</button>
            <button onClick={() => onRemoveFavorite(city)} style={{ marginLeft: '10px', color: 'red' }}>
              Verwijder
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteCities;
