
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';

import './App.css';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('Toronto');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName) return;
    if (!API_KEY) {
      setError('Missing API key. Add REACT_APP_OPENWEATHER_API_KEY in .env');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;
      const { data } = await axios.get(url);
      setWeather(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(`City "${cityName}" not found.`);
      } else if (err.response && err.response.status === 401) {
        setError('Invalid API key. Check your .env and restart npm start.');
      } else {
        setError('Error fetching weather data.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  const handleSearch = (newCity) => setCity(newCity);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar initialCity={city} onSearch={handleSearch} />

      {loading && <Loading />}

      {error && !loading && <ErrorMessage message={error} />}

      {!loading && !error && weather && (
        <>
          <WeatherCard data={weather} />
          <WeatherDetails data={weather} />
        </>
      )}
    </div>
  );
}

export default App;
