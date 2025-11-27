
import React from 'react';

function WeatherDetails({ data }) {
  // Guard to avoid "Cannot read properties of undefined"
  if (!data) return null;

  const { main, wind, clouds, sys, timezone, coord } = data;

  // Optional: format helpers inline (you can also keep them in utils/format.js)
  const toLocalTime = (unixSeconds, tz = 0) => {
    if (!unixSeconds) return '—';
    const ms = (unixSeconds + tz) * 1000;
    const date = new Date(ms);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const windDirection = (deg) => {
    if (deg == null) return '—';
    const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    const idx = Math.round(deg / 22.5) % 16;
    return dirs[idx];
  };

  return (
    <div className="weather-details">
      <p>Humidity: {typeof main?.humidity === 'number' ? main.humidity : '—'}%</p>
      <p>Pressure: {typeof main?.pressure === 'number' ? main.pressure : '—'} hPa</p>
      <p>
        Wind: {typeof wind?.speed === 'number' ? Math.round(wind.speed) : '—'} m/s
        {' '}• {windDirection(wind?.deg)}
      </p>
      <p>Cloudiness: {typeof clouds?.all === 'number' ? clouds.all : '—'}%</p>
      <p>Min/Max: {Number.isFinite(main?.temp_min) ? Math.round(main.temp_min) : '—'}°C /
         {Number.isFinite(main?.temp_max) ? Math.round(main.temp_max) : '—'}°C
      </p>
      <p>Coordinates: {coord?.lat ?? '—'}, {coord?.lon ?? '—'}</p>
      <p>Sunrise: {toLocalTime(sys?.sunrise, timezone)}</p>
      <p>Sunset: {toLocalTime(sys?.sunset, timezone)}</p>
    </div>
  );
}

export default WeatherDetails;
