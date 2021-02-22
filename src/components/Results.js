import React from 'react';

const Results = ({ results, city }) => {
  const currentWeather = results.current;
  const dailyWeather = results.daily;
  const code = results.current.weather[0].id;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Get weather code for icon for 4 day weather
  let dailyCode = day => {
    return dailyWeather[day].weather[0].id;
  }

  const today = new Date().getDay();

  // Format wind direction from deg to compass point
  const windDirection = (deg) => {
    if (deg === 0) return 'N'; 
    if (deg > 0 && deg < 90) return 'NE'; 
    if (deg === 90) return 'E'; 
    if (deg > 90 && deg < 180) return 'SE'; 
    if (deg === 180) return 'S'; 
    if (deg > 180 && deg < 270) return 'SW'; 
    if (deg === 270) return 'W'; 
    if (deg > 270 && deg < 360) return 'NW'; 
    return deg;
  }
  const wind_dir = windDirection(currentWeather.wind_deg)

  // Formatting next 4 days based on todays day for 4 day weather
  let nextDays = [];
  const setDays = (today) => {
    if (today === 0) nextDays = [1, 2, 3, 4];
    if (today === 1) nextDays = [2, 3, 4, 5];
    if (today === 2) nextDays = [3, 4, 5, 6];
    if (today === 3) nextDays = [4, 5, 6, 0];
    if (today === 4) nextDays = [5, 6, 0, 1];
    if (today === 5) nextDays = [6, 0, 1, 2];
    if (today === 6) nextDays = [0, 1, 2, 3];
}
setDays(today);

    return (
      <div>
        <div className='results-container'>
          <div className='results-left'>
            <div className='left-top'>
              <h2>{city}</h2>
              <h2>{days[today]}</h2>
              <h4>{new Date().getDate()} {months[new Date().getMonth()]} {new Date().getFullYear()}</h4>
            </div>
            <div className='left-bottom'>
              <div className='current'>
                <i className={`owf owf-${code} owf-4x`} />
                <h1>{currentWeather.temp.toFixed(0)}°c</h1>
              </div>
              <h4>Feels like {currentWeather.feels_like.toFixed(0)}°c</h4>
              <h4>{currentWeather.weather[0].main}</h4>
            </div>
          </div>
          <div className='results-right'>
            <div className='right-top'>
              <div>Humidity: <span>{currentWeather.humidity} %</span></div>
              <div>Pressure: <span>{currentWeather.pressure} mb</span></div>
              <div>Wind: <span>{currentWeather.wind_speed.toFixed(0)} km/h {wind_dir}</span></div>
            </div>
            <div className='right-bottom'>
              <div>
                <i className={`owf owf-${dailyCode(1)} owf-3x`} />
                <p>{shortDays[nextDays[0]]}</p>
                <h4>{dailyWeather[1].temp.day.toFixed(0)}°c</h4>
              </div>
              <div>
                <i className={`owf owf-${dailyCode(2)} owf-3x`} />
                <p>{shortDays[nextDays[1]]}</p>
                <h4>{dailyWeather[2].temp.day.toFixed(0)}°c</h4>
              </div>
              <div>
                <i className={`owf owf-${dailyCode(3)} owf-3x`} />
                <p>{shortDays[nextDays[2]]}</p>
                <h4>{dailyWeather[3].temp.day.toFixed(0)}°c</h4>
              </div>
              <div>
                <i className={`owf owf-${dailyCode(4)} owf-3x`} />
                <p>{shortDays[nextDays[3]]}</p>
                <h4>{dailyWeather[4].temp.day.toFixed(0)}°c</h4>
              </div>
            </div>
          </div>
          </div>
      </div>
    )
}

export default Results
