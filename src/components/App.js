import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../styles.scss';
import '../owfont-regular.css';
import Search from './Search';
import Results from './Results';

const App = () => {
  const [results, setResults] = useState({});
  const [city, setCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('london');
  const [isLoading, setIsLoading] = useState(true);

  const key = process.env.REACT_APP_API_KEY;

  // API call to fetch weather data, save the results to the results piece of state
  useEffect(() => {
    // Search current weather api to retrieve coordinates for OneCall API which provides 7 day forecast
    const searchCity = async (searchTerm) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?`
      const { data } = await axios.get(url, {
        params: {
          q: searchTerm,
          units: 'metric',
          appid: key
        }
      })
      setCity(data.name);
      getWeather(data.coord);
    }

    searchCity(searchTerm)
    const getWeather = async (coords) => {
      const url = 'https://api.openweathermap.org/data/2.5/onecall?'
      const { data } = await axios.get(url, {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          exclude: 'minutely,alerts',
          units: 'metric',
          appid: key
        }
      })
      setResults(data);
      setIsLoading(false);
    }
    
  }, [searchTerm])
  
  if(isLoading) {
    return (
      <div className='ui container main'>
      <h1 className='ui center aligned header'>React Weather App</h1>
      <Search setSearch={setSearchTerm} />
    </div>
    )
  }
  
  return (
    <div className='ui container main'>
      <h1 className='ui header center aligned'>React Weather App</h1>
      <Search setSearch={setSearchTerm} />
      <Results results={results} city={city} />
    </div>
  )
}

export default App
