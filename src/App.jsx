import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import "./reset.css";
import HomePage from '@pages/HomePage/HomePage';
import WeatherPage from '@pages//WeatherPage/WeatherPage';
import NavBar from '@functional/NavBar/NavBar';

function App() {
  return (
    <Router>
      <div className="App">

        <NavBar />
        
        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
