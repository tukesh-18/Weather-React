import React, { useState, useEffect } from 'react';
import './weather.css';
import searchIcon from "../Assets/search.png";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";

const Weather = () => {
  const [city, setCity] = useState('Pune');
  const [weatherData, setWeatherData] = useState(null);

  const searchWeather = async () => {
    try {
      const apiKey = 'ab0c5e3aa43527a9a2b9184c8a48fb1f';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === '404') {
        alert('Enter correct city name');
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  useEffect(() => {
    searchWeather();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    searchWeather();
  };

  return (
    <div className='weather'>
      <div className='search-box'>
        <input
          type='text'
          className='search-bar'
          placeholder='Search...'
          value={city}
          onChange={handleInputChange}
        />
        <img src={searchIcon} alt='search icon' onClick={handleSearchClick} />
      </div>
      {weatherData && (
        <>
          <img
            src={
              weatherData.weather[0].main === 'Clear'
                ? clear
                : weatherData.weather[0].main === 'Clouds'
                ? cloud
                : weatherData.weather[0].main === 'Drizzle'
                ? drizzle
                : weatherData.weather[0].main === 'Rain'
                ? rain
                : weatherData.weather[0].main === 'Snow'
                ? snow
                : clear
            }
            alt='weather icon'
            className='weather-icon'
          />
          <p className='temperature'>{weatherData.main.temp}°C</p>
          <p className='location'>{weatherData.name}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidityIcon} alt='humidity icon' />
              <p>{weatherData.main.humidity || 0} %</p>
              <span>Humidity</span>
            </div>
            <div className='col'>
              <img src={windIcon} alt='wind icon' />
              <p>{weatherData.wind.speed || 0} km/h</p>
              <span>Wind</span>
            </div>
            <div className='col'>
              <img src={cloud} alt='cloud icon' />
              <p>{weatherData.clouds.all || 0} %</p>
              <span>Cloud</span>
            </div>
            <div className='col'>
              <img src={rain} alt='rain icon' />
              <p>{weatherData.rain ? weatherData.rain['1h'] : 0} mm</p>
              <span>Rain</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
