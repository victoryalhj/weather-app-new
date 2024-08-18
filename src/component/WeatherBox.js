import React from 'react'

const WeatherBox = ({weather}) => {
  if(!weather || !weather.main){
    return <div>No data available</div>;
  }

  return <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp} / {weather?.main.temp*9/5+32}</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>

}

export default WeatherBox
