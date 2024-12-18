import React from 'react';

const GoogleMap = ({ latitude, longitude }) => {
  // Zorg ervoor dat de coördinaten beschikbaar zijn
  if (!latitude || !longitude) {
    return <p>Locatie niet beschikbaar.</p>;
  }

  // De link voor de Google Maps embed
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${latitude},${longitude}&zoom=10`;

  return (
    <div className="google-map">
      <iframe
        src={mapUrl}
        width="600"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
