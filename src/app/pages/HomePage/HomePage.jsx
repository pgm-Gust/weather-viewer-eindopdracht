import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="HomePage">
      <h1>Welkom bij de Weersvoorspelling App</h1>
      <p>Zoek het weer voor je stad:</p>
      {/* Link naar de WeatherPage */}
      <Link to="/weather">Ga naar de Weerpagina</Link>
    </div>
  );
}

export default HomePage;
