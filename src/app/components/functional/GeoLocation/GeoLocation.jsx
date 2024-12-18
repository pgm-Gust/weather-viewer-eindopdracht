// src/app/components/functional/Geolocation.js
import React, { useState, useEffect } from 'react';

const Geolocation = ({ setCoordinates }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (err) => setError('Er is een fout opgetreden bij het ophalen van de locatie.')
      );
    } else {
      setError('Geolocatie wordt niet ondersteund door deze browser.');
    }
  }, [setCoordinates]);

  return error ? <p style={{ color: 'red' }}>{error}</p> : null;
};

export default Geolocation;
