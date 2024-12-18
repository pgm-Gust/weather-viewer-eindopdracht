import React, { useState } from 'react';
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div>
      <button onClick={toggleTheme}>
        {darkMode ? 'Licht Thema' : 'Donker Thema'}
      </button>
      <div className={darkMode ? 'dark' : 'light'}>
        {/* De rest van de app zal hier naartoe worden gewikkeld */}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
