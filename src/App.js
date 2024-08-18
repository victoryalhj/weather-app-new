import { useEffect,useState,useCallback } from "react";
// import { useState } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

function App() {
  const [weather,setWeather]=useState(null);
  const getCurrentLocation=useCallback(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
    });
  },[]);

  const getWeatherByCurrentLocation = async(lat,lon) => {
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=faa38f17e7999e9f8f3778867a829169&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  useEffect(()=>{
    getCurrentLocation();
  },[getCurrentLocation]);

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather}/>
        <WeatherButton/>
      </div>

    </div>
  );
}

export default App;
