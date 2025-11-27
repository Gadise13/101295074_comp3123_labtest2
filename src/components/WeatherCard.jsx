
import React from 'react';

function WeatherCard({ data }) {
  // Guard against missing data to avoid "Cannot read properties of undefined"
  if (!data) return null;

  const { name, sys, weather, main } = data;
  const condition = weather?.[0];
 const iconUrl = condition ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png` : null;

  return (
    <div className="weather-card">
      <h2>{name}, {sys?.country}</h2>
      <p>{condition?.description}</p>
      <p>
        {Number.isFinite(main?.temp) ? Math.round(main.temp) : '-'}°C
        {' '}
        (feels like {Number.isFinite(main?.feels_like) ? Math.round(main.feels_like) : '-' }°C)
      </p>
      {iconUrl && <img src={iconUrl} alt={condition?.main ? `Weather icon: ${condition.main}` : 'Weather icon'} />}
    </div>
  );
}

export default WeatherCard;
