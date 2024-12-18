import { Link } from 'react-router-dom';
import './FavoriteCities.css';

function FavoriteCities({ favorites, onRemoveFavorite }) {
  return (
    <div>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <Link to={`/weather?city=${city}`}>{city}</Link>
            <button class="btn-delete" onClick={() => onRemoveFavorite(city)}>Verwijder</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteCities;
